import { Axis, Color3, Mesh, MeshBuilder, PhysicsImpostor, SceneLoader, Space, StandardMaterial, Texture, Vector3 } from "babylonjs";
import { DistrictObj } from "../../model/objs/DistrictObj";
import { GameObj, GameObjectJson, GameObjectType, GameObjTag } from "../../model/objs/GameObj";
import { QuarterObj } from "../../model/objs/QuarterObj";
import { PlayerIdleState } from "../../model/states/PlayerIdleState";
import { EnemyMovingState } from "../../model/states/EnemyMovingState";
import { World } from "../../services/World";
import { GroundJson } from "../io/DistrictJson";
import { StateComponent } from "../components/StateComponent";
import { HighlightAddon } from "../components/HighlightAddon";
import { AbstractFactoryFeature } from "./AbstractFactoryFeacture";
import { CollisionFactoryFeature } from "./CollisionFactoryFeature";
import { TransportAddon } from "../components/TransportAddon";
import { AddonFactoryFeature } from "./AddonFactoryFeature";
import { ModelFactoryFeature } from "./ModelFactoryFeature";
import { PhysicsFactoryFeature } from "./PhysicsFactoryFeature";
import { StateFactoryFeature } from "./StateFactoryFeature";
import { TagFactoryFeature } from "./TagFactoryFeature";
import { TextureFactoryFeature } from "./TextureFactoryFeature";
import { PositionFactoryFeature } from "./PositionFactoryFeature";

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

    featureFactories: AbstractFactoryFeature[] = [];

    constructor(districtObj: DistrictObj, world: World) {
        this.districtObj = districtObj;
        this.world = world;

        this.featureFactories = [
            new ModelFactoryFeature(world),
            new PositionFactoryFeature(),
            new TextureFactoryFeature(world),
            new CollisionFactoryFeature(world),
            new PhysicsFactoryFeature(world),
            new StateFactoryFeature(world),
            new TagFactoryFeature(),
            new AddonFactoryFeature(world),
        ];

        for (const value in GameObjectType) {
            const str = getIfStringEnumVal(value);
            if (str) {
                this.indexesByType.set(str, 0);
            }
        }
    }

    async create(gameObjectJson: GameObjectJson): Promise<GameObj> {

        const id = this.generateId(gameObjectJson.type);
        const gameObject = new GameObj(id, this.world);

        gameObject.type = gameObjectJson.type;
        gameObject.ch = gameObjectJson.ch;

        if (gameObjectJson.features) {

            const features = gameObjectJson.features;
            for (let i = 0; i < features.length; i++) {
                const featureName = features[i].split(' ')[0].trim();
                const factory = this.featureFactories.find(featureFactory => featureFactory.feature === featureName);
    
                if (factory) {
                    await this.processFeature(factory, gameObject, features[i]);
                }
            }
        }

        // switch(gameObjectJson.type) {
        //     case GameObjectType.Tree1:
        //     case GameObjectType.Tree2:
        //     case GameObjectType.Tree3:
        //     case GameObjectType.Tree4:
        //     case GameObjectType.Tree5:
        //     case GameObjectType.Tree6:
        //         gameObject = await this.createTree(gameObjectJson);
        //     break;
        //     case GameObjectType.Player:
        //         gameObject = await this.createPlayer(gameObjectJson);
        //     break;
        //     case GameObjectType.Enemy:
        //         gameObject = await this.createEnemy(gameObjectJson);
        //     break;
        //     case GameObjectType.House1:
        //     case GameObjectType.House2:
        //     case GameObjectType.House3:
        //         gameObject = await this.createHouse(gameObjectJson);
        //     break;
        //     case GameObjectType.Bicycle1:
        //         gameObject = await this.createDefault(gameObjectJson);
        //     break;
        //     case GameObjectType.Road1:
        //         gameObject = await this.createDefault(gameObjectJson);
        //     break;
        //     default:
        //         gameObject = await this.createDefault(gameObjectJson);
        //     break;
        // }

        // const tagStr = this.districtObj.json.tags[gameObject.type];
        // if (tagStr) {
        //     gameObject.tag.add(...(tagStr.split(' ') as GameObjTag[]));
        // }

        return gameObject;
    }

    private async processFeature(factory: AbstractFactoryFeature, gameObj: GameObj, feature: string): Promise<void> {
        if (factory.isAsync()) {
            await factory.processFeatureAsync(gameObj, feature);
        } else {
            factory.processFeature(gameObj, feature);
        }
    }

    // async createDefault(json: GameObjectJson) {
    //     const result = await this.load(json.modelPath);
    //     const id = this.generateId(json.type);
        
    //     const gameObject = new GameObj(id, this.findMainMesh(result.meshes as Mesh[]), this.world);
    //     gameObject.allMeshes = <Mesh[]> result.meshes;

    //     // if (json.type === GameObjectType.BusStop) {
    //         // gameObject.addon.add(new TransportAddon(this.world));
    //     // }

    //     if (json.rotation) { gameObject.mainMesh.rotate(Axis.Y, json.rotation, Space.WORLD); }
    //     this.createTexture(gameObject, json);
    //     if (!json.collider) { 
    //         this.setMeshPosition(gameObject, json);
    //     }
    //     gameObject.getMesh().parent = this.districtObj.basicComp.platform;
    //     gameObject.getMesh().translate(Axis.Y, 0.2, Space.WORLD);

    //     return gameObject;
    // }

    // async createTree(json: GameObjectJson) {
    //     const result = await this.load(json.modelPath);
    //     const id = this.generateId(json.type);
        
    //     const gameObject = new GameObj(id, <Mesh> result.meshes[0], this.world);
    //     gameObject.allMeshes = <Mesh[]> result.meshes;

    //     if (json.rotation) { gameObject.mainMesh.rotate(Axis.Y, json.rotation, Space.WORLD); }
    //     this.createTexture(gameObject, json);
    //     this.featureFactories.forEach(feature => feature.process(gameObject, json));
    //     // this.createCollider(gameObject, json);
    //     // if (json.physics) { this.createPhysics(gameObject); }
    //     gameObject.colliderMesh.parent = this.districtObj.basicComp.platform;
    //     gameObject.getMesh().translate(Axis.Y, 0.2, Space.WORLD);

    //     return gameObject;
    // }

    // async createHouse(json: GameObjectJson) {
    //     const result = await this.load(json.modelPath);
    //     const id = this.generateId(json.type);
        
    //     const gameObject = new GameObj(id, <Mesh> result.meshes[1], this.world);
    //     gameObject.allMeshes = <Mesh[]> result.meshes;
        
    //     this.createTexture(gameObject, json);
    //     // this.createCollider(gameObject, json);
    //     this.setRotation(gameObject, json);
    //     // if (json.physics) { this.createPhysics(gameObject); }
    //     gameObject.colliderMesh.parent = this.districtObj.basicComp.platform;
    //     gameObject.getMesh().translate(Axis.Y, 0.2, Space.WORLD);

    //     return gameObject;
    // }

    // async createPlayer(json: GameObjectJson): Promise<GameObj> {
    //     const result = await this.load(json.modelPath);
    //     const id = this.generateId(json.type);

    //     result.animationGroups.forEach(animationGroup => animationGroup.stop());
    //     const gameObject = new GameObj(id, <Mesh> result.meshes[0], this.world);
    //     gameObject.allMeshes = <Mesh[]> result.meshes;

    //     gameObject.state = new StateComponent(new PlayerIdleState(gameObject, this.world), this.world);
    //     gameObject.skeleton = result.skeletons.length > 0 ? result.skeletons[0] : undefined;
    //     gameObject.animationGroups = result.animationGroups;
    //     gameObject.addon.add(new HighlightAddon(this.world));

    //     if (json.rotation) { gameObject.mainMesh.rotate(Axis.Y, json.rotation, Space.WORLD); }
        
    //     // this.createCollider(gameObject, json);
    //     gameObject.colliderMesh.translate(Axis.Y, 0.5, Space.WORLD);
    //     this.createPhysics(gameObject);

    //     gameObject.colliderMesh.parent = this.districtObj.basicComp.platform;
    //     gameObject.getMesh().translate(Axis.Y, 0.2, Space.WORLD);

    //     this.world.controller.player.setPlayer(gameObject);

    //     return gameObject;
    // }

    // async createEnemy(json: GameObjectJson): Promise<GameObj> {
    //     const result = await this.load(json.modelPath);
    //     const id = this.generateId(json.type);
        
    //     result.animationGroups.forEach(animationGroup => animationGroup.stop());
    //     const gameObject = new GameObj(id, <Mesh> result.meshes[0], this.world);
    //     gameObject.allMeshes = <Mesh[]> result.meshes;
        
    //     gameObject.state = new StateComponent(new EnemyMovingState(gameObject, this.world), this.world);
    //     gameObject.skeleton = result.skeletons.length > 0 ? result.skeletons[0] : undefined;
    //     gameObject.animationGroups = result.animationGroups;

    //     // if (json.rotation) { gameObject.mesh.rotate(Axis.Y, json.rotation, Space.WORLD); }
    //     // this.createCollider(gameObject, json);
    //     this.createPhysics(gameObject);

    //     gameObject.colliderMesh.parent = this.districtObj.basicComp.platform;
    //     gameObject.getMesh().translate(Axis.Y, 0.2, Space.WORLD);

    //     return gameObject;
    // }

    createGround(size: number): Mesh {
        const ground = MeshBuilder.CreateBox('ground', { width: size, depth: size, height: 0.2 });
        ground.translate(Axis.Y, -0.21, Space.WORLD);
        const material = new StandardMaterial(`ground--material`, this.world.scene);
        material.diffuseColor = Color3.FromHexString('#FFFFFF');
        material.specularColor = new Color3(0, 0, 0);
        ground.material = material;

        ground.physicsImpostor = new PhysicsImpostor(ground, PhysicsImpostor.BoxImpostor, { mass: 0 }, this.world.scene);

        return ground;
    }


    createGroundTile(groundJson: GroundJson, size: number, index: number): QuarterObj {
        const ground = MeshBuilder.CreateGround(`ground-${index}`, { width: size, height: size });
        
        const material = new StandardMaterial(`ground-${index}-material`, this.world.scene);
        material.diffuseColor = Color3.FromHexString(groundJson.color);
        material.specularColor = new Color3(0, 0, 0);
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

    // private async load(path: string) {
    //     return await SceneLoader.ImportMeshAsync('', "assets/models/", path, this.world.scene);
    // }

    private generateId(type: GameObjectType) {
        const currIndex = this.indexesByType.get(type);
        this.indexesByType.set(type, currIndex + 1);
        return `${type}-${currIndex + 1}`;
    }

    // private createTexture(gameObject: GameObj, json: GameObjectJson) {
    //     if (!json.texturePath) { return; }

    //     const texture = new Texture(`assets/textures/${json.texturePath}`, this.world.scene);
    //     const material = new StandardMaterial(gameObject.id, this.world.scene);
    //     material.diffuseTexture = texture;
    //     material.specularColor = new BABYLON.Color3(0, 0, 0);

    //     // material.specularTexture = texture;
    //     // material.emissiveTexture = texture;
    //     gameObject.allMeshes[json.textureMeshIndex].material = material;
    // }

    // private setRotation(gameObject: GameObj, json: GameObjectJson) {
    //     if (!json.rotation) { return; }

    //     gameObject.colliderMesh.rotate(Axis.Y, json.rotation, Space.LOCAL);
    // }

    // private setMeshPosition(gameObject: GameObj, json: GameObjectJson) {
    //     gameObject.mainMesh.setAbsolutePosition(json.position);
    // }

    // private createPhysics(gameObject: GameObj) {
    //     gameObject.colliderMesh.physicsImpostor = new PhysicsImpostor(gameObject.colliderMesh, PhysicsImpostor.BoxImpostor, { mass: 1,  }, this.world.scene);
    // }

    // private findMainMesh(meshes: Mesh[]) {
    //     return meshes.find(mesh => mesh.getBoundingInfo().boundingBox.extendSize.x > 0) || meshes[0];
    // }
}