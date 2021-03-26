import { Axis, Color3, Mesh, MeshBuilder, PhysicsImpostor, SceneLoader, Space, StandardMaterial, Texture, Vector3 } from "babylonjs";
import { DistrictObj } from "../../model/objs/DistrictObj";
import { GameObj, GameObjectJson, GameObjectType, GameObjTag } from "../../model/objs/GameObj";
import { QuarterObj } from "../../model/objs/QuarterObj";
import { IdleCharacterState } from "../../model/states/IdleCharacterState";
import { SearchingEnemyState } from "../../model/states/SearchingEnemyState";
import { World } from "../../services/World";
import { GroundJson } from "../io/DistrictJson";
import { StateHandler } from "../handlers/StateHandler";

function getIfStringEnumVal(value: string) {
    if (!isNaN(Number(value))) {
        return;
    }

    return value;
}

export class GameObjectFactory {
    private districtObj: DistrictObj;
    private world: World;
    private indexesByType: Map<string, number> = new Map();

    constructor(districtObj: DistrictObj, world: World) {
        this.districtObj = districtObj;
        this.world = world;

        for (const value in GameObjectType) {
            const str = getIfStringEnumVal(value);
            if (str) {
                this.indexesByType.set(str, 0);
            }
        }
    }

    async create(gameObjectJson: GameObjectJson): Promise<GameObj> {
        let gameObject: GameObj;

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

        gameObject.type = gameObjectJson.type;

        const tagStr = this.districtObj.json.tags[gameObject.type];
        if (tagStr) {
            gameObject.tags.add(...(tagStr.split(' ') as GameObjTag[]));
        }

        return gameObject;
    }

    async createDefault(json: GameObjectJson) {
        const result = await this.load(json.modelPath);
        const id = this.generateId(json.type);
        
        const gameObject = new GameObj(id, <Mesh> result.meshes[0]);
        gameObject.allMeshes = <Mesh[]> result.meshes;

        if (json.rotation) { gameObject.mainMesh.rotate(Axis.Y, json.rotation, Space.WORLD); }
        this.createTexture(gameObject, json);
        if (json.colliderSize) { 
            this.createCollider(gameObject, json); 
        } else {
            this.setMeshPosition(gameObject, json);
        }

        gameObject.getMesh().parent = this.districtObj.basicComp.platform;
        gameObject.getMesh().translate(Axis.Y, 0.2, Space.WORLD);

        return gameObject;
    }

    async createTree(json: GameObjectJson) {
        const result = await this.load(json.modelPath);
        const id = this.generateId(json.type);
        
        const gameObject = new GameObj(id, <Mesh> result.meshes[0]);
        gameObject.allMeshes = <Mesh[]> result.meshes;

        if (json.rotation) { gameObject.mainMesh.rotate(Axis.Y, json.rotation, Space.WORLD); }
        this.createTexture(gameObject, json);
        this.createCollider(gameObject, json);
        // if (json.physics) { this.createPhysics(gameObject); }
        gameObject.colliderMesh.parent = this.districtObj.basicComp.platform;
        gameObject.getMesh().translate(Axis.Y, 0.2, Space.WORLD);

        return gameObject;
    }

    async createHouse(json: GameObjectJson) {
        const result = await this.load(json.modelPath);
        const id = this.generateId(json.type);
        
        const gameObject = new GameObj(id, <Mesh> result.meshes[1]);
        gameObject.allMeshes = <Mesh[]> result.meshes;
        
        this.createTexture(gameObject, json);
        this.createCollider(gameObject, json);
        this.setRotation(gameObject, json);
        // if (json.physics) { this.createPhysics(gameObject); }
        gameObject.colliderMesh.parent = this.districtObj.basicComp.platform;
        gameObject.getMesh().translate(Axis.Y, 0.2, Space.WORLD);

        return gameObject;
    }

    async createPlayer(json: GameObjectJson): Promise<GameObj> {
        const result = await this.load(json.modelPath);
        const id = this.generateId(json.type);

        result.animationGroups.forEach(animationGroup => animationGroup.stop());
        const gameObject = new GameObj(id, <Mesh> result.meshes[0]);
        gameObject.allMeshes = <Mesh[]> result.meshes;

        gameObject.states = new StateHandler(new IdleCharacterState(gameObject, this.world), this.world);
        gameObject.skeleton = result.skeletons.length > 0 ? result.skeletons[0] : undefined;
        gameObject.animationGroups = result.animationGroups;

        if (json.rotation) { gameObject.mainMesh.rotate(Axis.Y, json.rotation, Space.WORLD); }
        this.createCollider(gameObject, json);
        gameObject.colliderMesh.translate(Axis.Y, 0.5, Space.WORLD);
        this.createPhysics(gameObject);
        this.applyCameraTarget(gameObject, json);

        gameObject.colliderMesh.parent = this.districtObj.basicComp.platform;
        gameObject.getMesh().translate(Axis.Y, 0.2, Space.WORLD);

        return gameObject;
    }

    async createEnemy(json: GameObjectJson): Promise<GameObj> {
        const result = await this.load(json.modelPath);
        const id = this.generateId(json.type);
        
        result.animationGroups.forEach(animationGroup => animationGroup.stop());
        const gameObject = new GameObj(id, <Mesh> result.meshes[0]);
        gameObject.allMeshes = <Mesh[]> result.meshes;
        
        gameObject.states = new StateHandler(new SearchingEnemyState(gameObject, this.world), this.world);
        gameObject.skeleton = result.skeletons.length > 0 ? result.skeletons[0] : undefined;
        gameObject.animationGroups = result.animationGroups;

        // if (json.rotation) { gameObject.mesh.rotate(Axis.Y, json.rotation, Space.WORLD); }
        this.createCollider(gameObject, json);
        this.createPhysics(gameObject);

        gameObject.colliderMesh.parent = this.districtObj.basicComp.platform;
        gameObject.getMesh().translate(Axis.Y, 0.2, Space.WORLD);

        return gameObject;
    }

    createGround(size: number): Mesh {
        const ground = MeshBuilder.CreateBox('ground', { width: size, depth: size, height: 0.2 });
        ground.translate(Axis.Y, -0.21, Space.WORLD);
        const material = new StandardMaterial(`ground--material`, this.world.scene);
        material.diffuseColor = Color3.FromHexString('#FFFFFF');
        ground.material = material;

        ground.physicsImpostor = new PhysicsImpostor(ground, PhysicsImpostor.BoxImpostor, { mass: 0 }, this.world.scene);

        return ground;
    }


    createGroundTile(groundJson: GroundJson, size: number, index: number): QuarterObj {
        const ground = MeshBuilder.CreateGround(`ground-${index}`, { width: size, height: size });
        
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
        ground.parent = this.districtObj.basicComp.platform;
        ground.translate(Axis.Y, 0.2, Space.WORLD);

        return new QuarterObj(this.districtObj, ground);
        // this.districtObj.basicComp.platform.isVisible = false;
    }

    private async load(path: string) {
        return await SceneLoader.ImportMeshAsync('', "assets/models/", path, this.world.scene);
    }

    private generateId(type: GameObjectType) {
        const currIndex = this.indexesByType.get(type);
        this.indexesByType.set(type, currIndex + 1);
        return `${type}-${currIndex + 1}`;
    }

    private createTexture(gameObject: GameObj, json: GameObjectJson) {
        if (!json.texturePath) { return; }

        const texture = new Texture(`assets/textures/${json.texturePath}`, this.world.scene);
        const material = new StandardMaterial(gameObject.id, this.world.scene);
        material.diffuseTexture = texture;
        material.specularTexture = texture;
        material.emissiveTexture = texture;
        gameObject.allMeshes[json.textureMeshIndex].material = material;
    }

    private setRotation(gameObject: GameObj, json: GameObjectJson) {
        if (!json.rotation) { return; }

        gameObject.colliderMesh.rotate(Axis.Y, json.rotation, Space.LOCAL);
    }

    private createCollider(gameObject: GameObj, json: GameObjectJson) {
        const dimensions = json.colliderSize;
        const [width, depth, height] = [dimensions.x, dimensions.z, dimensions.y];
        const collider = MeshBuilder.CreateBox(`${json.id}-collider`, { width, depth, height}, this.world.scene);
        collider.checkCollisions = true;
        gameObject.mainMesh.parent = collider;
        collider.setAbsolutePosition(json.position);
        collider.translate(Axis.Y, dimensions.y / 2, Space.WORLD);
        gameObject.mainMesh.translate(Axis.Y, -dimensions.y / 2, Space.LOCAL);
        const colliderMaterial = new StandardMaterial(`${json.id}-collider-material`, this.world.scene);
        colliderMaterial.alpha = 0;
        collider.material = colliderMaterial;
        gameObject.colliderMesh = collider;
    }

    private setMeshPosition(gameObject: GameObj, json: GameObjectJson) {
        gameObject.mainMesh.setAbsolutePosition(json.position);
    }

    private createPhysics(gameObject: GameObj) {
        gameObject.colliderMesh.physicsImpostor = new PhysicsImpostor(gameObject.colliderMesh, PhysicsImpostor.BoxImpostor, { mass: 1,  }, this.world.scene);
    }

    private applyCameraTarget(gameObject: GameObj, json: GameObjectJson) {
        const cameraTarget = MeshBuilder.CreateBox(`${json.id}-camera-target`, { width: 0.5, depth: 0.5, height: 0.5}, this.world.scene);
        gameObject.cameraTargetMesh = cameraTarget;
        cameraTarget.parent = gameObject.colliderMesh;
        cameraTarget.isVisible = false;
    }
}