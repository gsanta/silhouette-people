import { Axis, Color3, Mesh, MeshBuilder, PhysicsImpostor, SceneLoader, Space, StandardMaterial, Texture, Vector3 } from "babylonjs";
import { GameObject, GameObjectJson, GameObjectRole, GameObjectType } from "../model/game_object/GameObject";
import { IdleCharacterState } from "../model/game_object/states/IdleCharacterState";
import { SearchingEnemyState } from "../model/game_object/states/SearchingEnemyState";
import { World } from "../model/World";
import { GroundJson } from "./import/ImportService";

function getIfStringEnumVal(value: string) {
    if (!isNaN(Number(value))) {
        return;
    }

    return value;
}

export class FactoryService {
    private world: World;
    private indexesByType: Map<string, number> = new Map();

    constructor(world: World) {
        this.world = world;

        for (const value in GameObjectType) {
            const str = getIfStringEnumVal(value);
            if (str) {
                this.indexesByType.set(str, 0);
            }
        }
    }

    async create(gameObjectJson: GameObjectJson) {
        let gameObject: GameObject;

        switch(gameObjectJson.type) {
            case GameObjectType.Tree1:
            case GameObjectType.Tree2:
            case GameObjectType.Tree3:
            case GameObjectType.Tree4:
            case GameObjectType.Tree5:
            case GameObjectType.Tree6:
                gameObject = await this.createTree(gameObjectJson);
            break;
            case GameObjectType.Player:
                gameObject = await this.createPlayer(gameObjectJson);
            break;
            case GameObjectType.Enemy:
                gameObject = await this.createEnemy(gameObjectJson);
            break;
            case GameObjectType.House1:
            case GameObjectType.House2:
            case GameObjectType.House3:
                gameObject = await this.createHouse(gameObjectJson);
            break;
            case GameObjectType.Bicycle1:
                gameObject = await this.createDefault(gameObjectJson);
            break;
            case GameObjectType.Road1:
                gameObject = await this.createDefault(gameObjectJson);
            break;

        }

        this.world.store.add(gameObject);
    }

    async createDefault(json: GameObjectJson) {
        const result = await this.load(json.modelPath);
        const id = this.generateId(json.type);
        
        const gameObject = new GameObject(id, GameObjectRole.Static, <Mesh> result.meshes[1]);
        gameObject.allMeshes = <Mesh[]> result.meshes;

        if (json.rotation) { gameObject.mesh.rotate(Axis.Y, json.rotation, Space.WORLD); }
        this.createTexture(gameObject, json);
        if (json.colliderSize) { this.createCollider(gameObject, json); }

        return gameObject;
    }

    async createTree(json: GameObjectJson) {
        const result = await this.load(json.modelPath);
        const id = this.generateId(json.type);
        
        const gameObject = new GameObject(id, GameObjectRole.Static, <Mesh> result.meshes[0]);

        if (json.rotation) { gameObject.mesh.rotate(Axis.Y, json.rotation, Space.WORLD); }
        this.createTexture(gameObject, json);
        this.createCollider(gameObject, json);
        // if (json.physics) { this.createPhysics(gameObject); }

        return gameObject;
    }

    async createHouse(json: GameObjectJson) {
        const result = await this.load(json.modelPath);
        const id = this.generateId(json.type);
        
        const gameObject = new GameObject(id, GameObjectRole.Static, <Mesh> result.meshes[1]);

        this.createTexture(gameObject, json);
        this.createCollider(gameObject, json);
        this.setRotation(gameObject, json);
        // if (json.physics) { this.createPhysics(gameObject); }

        return gameObject;
    }

    async createPlayer(json: GameObjectJson): Promise<GameObject> {
        const result = await this.load(json.modelPath);
        const id = this.generateId(json.type);

        result.animationGroups.forEach(animationGroup => animationGroup.stop());
        const gameObject = new GameObject(id, GameObjectRole.Player, <Mesh> result.meshes[0]);

        gameObject.state = new IdleCharacterState(gameObject, this.world);
        gameObject.skeleton = result.skeletons.length > 0 ? result.skeletons[0] : undefined;
        gameObject.animationGroups = result.animationGroups;

        if (json.rotation) { gameObject.mesh.rotate(Axis.Y, json.rotation, Space.WORLD); }
        this.createCollider(gameObject, json);
        gameObject.colliderMesh.translate(Axis.Y, 0.5, Space.WORLD);
        this.createPhysics(gameObject);
        this.applyCameraTarget(gameObject, json);


        return gameObject;
    }

    async createEnemy(json: GameObjectJson): Promise<GameObject> {
        const result = await this.load(json.modelPath);
        const id = this.generateId(json.type);
        
        result.animationGroups.forEach(animationGroup => animationGroup.stop());
        const gameObject = new GameObject(id, GameObjectRole.Enemy, <Mesh> result.meshes[0]);
        
        gameObject.state = new SearchingEnemyState(gameObject, this.world);
        gameObject.skeleton = result.skeletons.length > 0 ? result.skeletons[0] : undefined;
        gameObject.animationGroups = result.animationGroups;

        // if (json.rotation) { gameObject.mesh.rotate(Axis.Y, json.rotation, Space.WORLD); }
        this.createCollider(gameObject, json);
        this.createPhysics(gameObject);

        return gameObject;
    }

    createGround(size: number) {
        const ground = MeshBuilder.CreateBox('ground', { width: size, depth: size, height: 0.2 });
        ground.translate(Axis.Y, -0.21, Space.WORLD);
        const material = new StandardMaterial(`ground--material`, this.world.scene);
        material.diffuseColor = Color3.FromHexString('#FFFFFF');
        ground.material = material;

        ground.physicsImpostor = new PhysicsImpostor(ground, PhysicsImpostor.BoxImpostor, { mass: 0 }, this.world.scene);
    }


    createGroundTile(groundJson: GroundJson, size: number, index: number) {
        const ground = MeshBuilder.CreateGround('ground', { width: size, height: size });
        
        const material = new StandardMaterial(`ground-${index}-material`, this.world.scene);
        material.diffuseColor = Color3.FromHexString(groundJson.color);
        ground.material = material;
        
        const halfSize = size / 2;

        switch(index) {
            case 0:
                ground.translate(new Vector3(halfSize, 0, halfSize), 1, Space.WORLD);
            break;
            case 1:
                ground.translate(new Vector3(halfSize, 0, -halfSize), 1, Space.WORLD);
            break;
            case 2:
                ground.translate(new Vector3(-halfSize, 0, -halfSize), 1, Space.WORLD);
            break;
            case 3:
                ground.translate(new Vector3(-halfSize, 0, halfSize), 1, Space.WORLD);
            break;
        }
    }

    private async load(path: string) {
        return await SceneLoader.ImportMeshAsync('', "assets/models/", path, this.world.scene);
    }

    private generateId(type: GameObjectType) {
        const currIndex = this.indexesByType.get(type);
        this.indexesByType.set(type, currIndex + 1);
        return `${type}-${currIndex + 1}`;
    }

    // static async create(json: GameObjectJson, world: World): Promise<GameObject> {
    //     const result = await SceneLoader.ImportMeshAsync('', "./models/", json.modelPath, world.scene);

    //     switch(json.type) {
    //         case GameObjectType.Player:
    //             return await this.createPlayer(result, json, world);
    //         case GameObjectType.Enemy:
    //             return await this.createEnemy(result, json, world);
    //         case GameObjectType.Static:
    //             return await this.createStatic(result, json, world);
    //     }
    // }

    // private static createPlayer(importedMeshes: ISceneLoaderAsyncResult, json: GameObjectJson, world: World): GameObject {
    //     importedMeshes.animationGroups.forEach(animationGroup => animationGroup.stop());

    //     const mainMesh = <Mesh> importedMeshes.meshes[0];
    //     mainMesh.name = json.id;
        
        
    //     const gameObject = new GameObject(mainMesh);
    //     gameObject.state = new IdleCharacterState(gameObject, world);
    //     gameObject.role = json.type;
    //     gameObject.skeleton = importedMeshes.skeletons.length > 0 ? importedMeshes.skeletons[0] : undefined;
    //     gameObject.animationGroups = importedMeshes.animationGroups;

    //     if (json.collider) {
    //         this.applyCollider(gameObject, json, world);
    //     }

    //     if (json.cameraTarget) {
    //         this.applyCameraTarget(gameObject, json, world);
    //     }

    //     if (json.physics) {
    //         this.createPhysics(gameObject, json, world);
    //     }

    //     world.store.add(gameObject);

    //     return gameObject;
    // }

    // private static createEnemy(importedMeshes: ISceneLoaderAsyncResult, json: GameObjectJson, world: World): GameObject {
    //     importedMeshes.animationGroups.forEach(animationGroup => animationGroup.stop());

    //     const mainMesh = <Mesh> importedMeshes.meshes[0];
    //     mainMesh.name = json.id;
        
    //     const gameObject = new GameObject(mainMesh);
    //     gameObject.state = new SearchingEnemyState(gameObject, world);
    //     gameObject.role = json.type;
    //     gameObject.skeleton = importedMeshes.skeletons.length > 0 ? importedMeshes.skeletons[0] : undefined;
    //     gameObject.animationGroups = importedMeshes.animationGroups;

    //     if (json.collider) {
    //         this.applyCollider(gameObject, json, world);
    //     }
        
    //     if (json.physics) {
    //         this.createPhysics(gameObject, json, world);
    //     }

    //     world.store.add(gameObject);

    //     return gameObject;
    // }

    // private static createStatic(importedMeshes: ISceneLoaderAsyncResult, json: GameObjectJson, world: World): GameObject {
    //     importedMeshes.animationGroups.forEach(animationGroup => animationGroup.stop());

    //     const mainMesh = <Mesh> importedMeshes.meshes[0];
    //     mainMesh.name = json.id;
        
    //     let state: AbstractCharacterState;

    //     const gameObject = new GameObject(mainMesh);
    //     gameObject.state = state;
    //     gameObject.role = json.type;
    //     gameObject.skeleton = importedMeshes.skeletons.length > 0 ? importedMeshes.skeletons[0] : undefined;
    //     gameObject.animationGroups = importedMeshes.animationGroups;

    //     if (json.rotation) {
    //         mainMesh.rotate(Axis.Y, json.rotation, Space.WORLD);
    //     }

    //     if (json.texturePath) {
    //         const texture = new Texture(`assets/textures/${json.texturePath}`, world.scene);
    //         const material = new StandardMaterial(json.id, world.scene);
    //         material.diffuseTexture = texture;
    //         importedMeshes.meshes[1].material = material;
    //     }

    //     if (json.collider) {
    //         this.applyCollider(gameObject, json, world);
    //     }

    //     if (json.physics) {
    //         this.createPhysics(gameObject, json, world);
    //     }

    //     world.store.add(gameObject);

    //     return gameObject;
    // }

    private createTexture(gameObject: GameObject, json: GameObjectJson) {
        if (!json.texturePath) { return; }

        const texture = new Texture(`assets/textures/${json.texturePath}`, this.world.scene);
        const material = new StandardMaterial(gameObject.id, this.world.scene);
        material.diffuseTexture = texture;
        material.specularTexture = texture;
        material.emissiveTexture = texture;
        gameObject.mesh.material = material;
    }

    private setRotation(gameObject: GameObject, json: GameObjectJson) {
        if (!json.rotation) { return; }

        gameObject.colliderMesh.rotate(Axis.Y, json.rotation, Space.LOCAL);
    }

    private createCollider(gameObject: GameObject, json: GameObjectJson) {
        const dimensions = json.colliderSize;
        const [width, depth, height] = [dimensions.x, dimensions.z, dimensions.y];
        const collider = MeshBuilder.CreateBox(`${json.id}-collider`, { width, depth, height}, this.world.scene);
        collider.checkCollisions = true;
        gameObject.mesh.parent = collider;
        collider.setAbsolutePosition(json.position);
        collider.translate(Axis.Y, dimensions.y / 2, Space.WORLD);
        gameObject.mesh.translate(Axis.Y, -dimensions.y / 2, Space.LOCAL);
        const colliderMaterial = new StandardMaterial(`${json.id}-collider-material`, this.world.scene);
        colliderMaterial.alpha = 0;
        collider.material = colliderMaterial;
        gameObject.colliderMesh = collider;
    }

    private createPhysics(gameObject: GameObject) {
        gameObject.colliderMesh.physicsImpostor = new PhysicsImpostor(gameObject.colliderMesh, PhysicsImpostor.BoxImpostor, { mass: 1,  }, this.world.scene);
    }

    private applyCameraTarget(gameObject: GameObject, json: GameObjectJson) {
        const cameraTarget = MeshBuilder.CreateBox(`${json.id}-camera-target`, { width: 0.5, depth: 0.5, height: 0.5}, this.world.scene);
        gameObject.cameraTargetMesh = cameraTarget;
        cameraTarget.parent = gameObject.colliderMesh;
        cameraTarget.isVisible = false;
    }
}