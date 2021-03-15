import { Axis, Color3, ISceneLoaderAsyncResult, Mesh, MeshBuilder, PhysicsImpostor, SceneLoader, Space, StandardMaterial, Texture, Vector3 } from "babylonjs";
import { SearchingEnemyState } from "../model/game_object/states/SearchingEnemyState";
import { AbstractCharacterState } from "../model/game_object/states/AbstractCharacterState";
import { IdleCharacterState } from "../model/game_object/states/IdleCharacterState";
import { GameObject, GameObjectJson, GameObjectRole, GameObjectType } from "../model/game_object/GameObject";
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
                gameObject = await this.createTree(gameObjectJson);
            break;
        }

        this.world.store.add(gameObject);
    }

    async createTree(json: GameObjectJson) {
        const result = await this.load(json.type);
        const id = this.generateId(json.type);
        
        const gameObject = new GameObject(id, GameObjectRole.Static, <Mesh> result.meshes[0]);

        if (json.rotation) { gameObject.mesh.rotate(Axis.Y, json.rotation, Space.WORLD); }
        if (json.texturePath) { this.createTexture('texture694.jpg', gameObject); }
        if (json.collider) { this.createCollider(gameObject, json); }
        if (json.physics) { this.createPhysics(gameObject); }

        return gameObject;
    }

    createGround(groundJson: GroundJson, size: number, index: number) {
        const ground = MeshBuilder.CreateGround('ground', { width: 50, height: 50 });
        
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
        return await SceneLoader.ImportMeshAsync('', "./models/", path, this.world.scene);
    }

    private generateId(type: GameObjectType) {
        const currIndex = this.indexesByType.get(type);
        this.indexesByType.set(type, currIndex + 1);
        return `${type}-${currIndex + 1}`;
    }

    static async create(json: GameObjectJson, world: World): Promise<GameObject> {
        const result = await SceneLoader.ImportMeshAsync('', "./models/", json.modelPath, world.scene);

        switch(json.type) {
            case GameObjectType.Player:
                return await this.createPlayer(result, json, world);
            case GameObjectType.Enemy:
                return await this.createEnemy(result, json, world);
            case GameObjectType.Static:
                return await this.createStatic(result, json, world);
        }
    }

    private static createPlayer(importedMeshes: ISceneLoaderAsyncResult, json: GameObjectJson, world: World): GameObject {
        importedMeshes.animationGroups.forEach(animationGroup => animationGroup.stop());

        const mainMesh = <Mesh> importedMeshes.meshes[0];
        mainMesh.name = json.id;
        
        
        const gameObject = new GameObject(mainMesh);
        gameObject.state = new IdleCharacterState(gameObject, world);
        gameObject.role = json.type;
        gameObject.skeleton = importedMeshes.skeletons.length > 0 ? importedMeshes.skeletons[0] : undefined;
        gameObject.animationGroups = importedMeshes.animationGroups;

        if (json.collider) {
            this.applyCollider(gameObject, json, world);
        }

        if (json.cameraTarget) {
            this.applyCameraTarget(gameObject, json, world);
        }

        if (json.physics) {
            this.createPhysics(gameObject, json, world);
        }

        world.store.add(gameObject);

        return gameObject;
    }

    private static createEnemy(importedMeshes: ISceneLoaderAsyncResult, json: GameObjectJson, world: World): GameObject {
        importedMeshes.animationGroups.forEach(animationGroup => animationGroup.stop());

        const mainMesh = <Mesh> importedMeshes.meshes[0];
        mainMesh.name = json.id;
        
        const gameObject = new GameObject(mainMesh);
        gameObject.state = new SearchingEnemyState(gameObject, world);
        gameObject.role = json.type;
        gameObject.skeleton = importedMeshes.skeletons.length > 0 ? importedMeshes.skeletons[0] : undefined;
        gameObject.animationGroups = importedMeshes.animationGroups;

        if (json.collider) {
            this.applyCollider(gameObject, json, world);
        }
        
        if (json.physics) {
            this.createPhysics(gameObject, json, world);
        }

        world.store.add(gameObject);

        return gameObject;
    }

    private static createStatic(importedMeshes: ISceneLoaderAsyncResult, json: GameObjectJson, world: World): GameObject {
        importedMeshes.animationGroups.forEach(animationGroup => animationGroup.stop());

        const mainMesh = <Mesh> importedMeshes.meshes[0];
        mainMesh.name = json.id;
        
        let state: AbstractCharacterState;

        const gameObject = new GameObject(mainMesh);
        gameObject.state = state;
        gameObject.role = json.type;
        gameObject.skeleton = importedMeshes.skeletons.length > 0 ? importedMeshes.skeletons[0] : undefined;
        gameObject.animationGroups = importedMeshes.animationGroups;

        if (json.rotation) {
            mainMesh.rotate(Axis.Y, json.rotation, Space.WORLD);
        }

        if (json.texturePath) {
            const texture = new Texture(`assets/textures/${json.texturePath}`, world.scene);
            const material = new StandardMaterial(json.id, world.scene);
            material.diffuseTexture = texture;
            importedMeshes.meshes[1].material = material;
        }

        if (json.collider) {
            this.applyCollider(gameObject, json, world);
        }

        if (json.physics) {
            this.createPhysics(gameObject, json, world);
        }

        world.store.add(gameObject);

        return gameObject;
    }

    private createTexture(textureName: string, gameObject: GameObject) {
        const texture = new Texture(`assets/textures/${textureName}`, this.world.scene);
        const material = new StandardMaterial(gameObject.id, this.world.scene);
        material.diffuseTexture = texture;
        gameObject.mesh.material = material;
    }

    private createCollider(gameObject: GameObject, json: GameObjectJson) {
        const dimensions = json.collider.dimensions;
        const [width, depth, height] = [dimensions.x, dimensions.z, dimensions.y];
        const collider = MeshBuilder.CreateBox(`${json.id}-collider`, { width, depth, height}, this.world.scene);
        collider.checkCollisions = true;
        gameObject.mesh.parent = collider;
        collider.translate(Axis.Y, -dimensions.y / 2, Space.WORLD);
        collider.setAbsolutePosition(json.position);
        const colliderMaterial = new StandardMaterial(`${json.id}-collider-material`, this.world.scene);
        colliderMaterial.alpha = 0;
        collider.material = colliderMaterial;
        gameObject.colliderMesh = collider;
    }

    private createPhysics(gameObject: GameObject) {
        gameObject.colliderMesh.physicsImpostor = new PhysicsImpostor(gameObject.colliderMesh, PhysicsImpostor.BoxImpostor, { mass: 1,  }, this.world.scene);
    }

    private static applyCameraTarget(gameObject: GameObject, json: GameObjectJson, world: World) {
        const cameraTarget = MeshBuilder.CreateBox(`${json.id}-camera-target`, { width: 0.5, depth: 0.5, height: 0.5}, world.scene);
        gameObject.cameraTargetMesh = cameraTarget;
        cameraTarget.parent = gameObject.colliderMesh;
        cameraTarget.isVisible = false;
    }
}