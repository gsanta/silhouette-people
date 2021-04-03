import { Axis, Color3, Mesh, MeshBuilder, PhysicsImpostor, Space, StandardMaterial, Vector3 } from "babylonjs";
import { DistrictObj } from "../../model/objs/DistrictObj";
import { GameObj, GameObjectJson, GameObjectType } from "../../model/objs/GameObj";
import { QuarterObj } from "../../model/objs/QuarterObj";
import { World } from "../../services/World";
import { GroundJson } from "../io/DistrictJson";
import { AbstractFactoryFeature } from "./AbstractFactoryFeacture";
import { AddonFactoryFeature } from "./AddonFactoryFeature";
import { CollisionFactoryFeature } from "./CollisionFactoryFeature";
import { ModelFactoryFeature } from "./ModelFactoryFeature";
import { PhysicsFactoryFeature } from "./PhysicsFactoryFeature";
import { PositionFactoryFeature } from "./PositionFactoryFeature";
import { RotateFactoryFeature } from "./RotateFactoryFeature";
import { StateFactoryFeature } from "./StateFactoryFeature";
import { TagFactoryFeature } from "./TagFactoryFeature";
import { TextureFactoryFeature } from "./TextureFactoryFeature";

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
            new RotateFactoryFeature()
        ];
    }

    async create(gameObjectJson: GameObjectJson): Promise<GameObj> {
        const id = this.generateId(gameObjectJson.type);
        const gameObject = new GameObj(id, this.world);

        gameObject.type = gameObjectJson.type;
        gameObject.ch = gameObjectJson.ch;
        gameObject.district = this.districtObj;

        if (gameObjectJson.features) {
            await this.processFeatureList(gameObject, gameObjectJson);
        }

        return gameObject;
    }

    createDistrictBorder(): GameObj {
        const id = this.generateId(GameObjectType.DistrictBorder);
        const gameObject = new GameObj(id, this.world);

        gameObject.type = GameObjectType.DistrictBorder;

        const myShape = [
            new Vector3(2, 0, 0),
            new Vector3(2.025, 0, 0),
            new Vector3(2.025, 0.2, 0),
            new Vector3(2, 0.2, 0)
        ];

        const mat = new StandardMaterial("mat", this.world.scene);
        mat.diffuseColor = Color3.Red();
        mat.alpha = 0.2;
        const lathe = MeshBuilder.CreateLathe("lathe", {shape: myShape, radius: this.districtObj.size.x / 3 + 2, tessellation:4, sideOrientation: Mesh.DOUBLESIDE});
        lathe.rotate(Axis.Y, Math.PI / 4, Space.WORLD);
        lathe.convertToFlatShadedMesh();

        lathe.translate(Axis.X, this.districtObj.centerPoint.x, Space.WORLD); 
        lathe.translate(Axis.Z, this.districtObj.centerPoint.y, Space.WORLD); 

        lathe.material = mat;

        gameObject.mesh.addMeshes([lathe], lathe);

        return gameObject;
    }

    private async processFeatureList(gameObj: GameObj, gameObjectJson: GameObjectJson) {
        for (const feature of gameObjectJson.features) {
            const featureName = feature.split(' ')[0].trim();

            const factory = this.featureFactories.find(featureFactory => featureFactory.feature === featureName);

            if (factory) {
                await this.processFeature(factory, gameObj, feature);
            }
        }
    }

    private async processFeature(factory: AbstractFactoryFeature, gameObj: GameObj, feature: string): Promise<void> {
        const [_featureName, ...attrs] = feature.split(' ').map(str => str.trim());
        if (factory.isAsync()) {
            await factory.processFeatureAsync(gameObj, attrs);
        } else {
            factory.processFeature(gameObj, attrs);
        }
    }

    createGround(id: string, size: number): Mesh {
        const ground = MeshBuilder.CreateBox(id, { width: size, depth: size, height: 0.2 });
        ground.translate(Axis.Y, -0.21, Space.WORLD);
        const material = new StandardMaterial(`ground--material`, this.world.scene);
        material.diffuseColor = Color3.FromHexString('#FFFFFF');
        material.specularColor = new Color3(0, 0, 0);
        ground.material = material;

        ground.physicsImpostor = new PhysicsImpostor(ground, PhysicsImpostor.BoxImpostor, { mass: 0 }, this.world.scene);

        return ground;
    }


    createQuarterGround(groundJson: GroundJson, size: number, index: number): GameObj {
        const id = this.generateId(GameObjectType.QuarterGround);
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

        const gameObject = new GameObj(id, this.world);
        gameObject.mesh.addMeshes([ground], ground);
        
        return gameObject;
    }

    private generateId(type: GameObjectType) {
        const currIndex = this.indexesByType.get(type) || 0;
        this.indexesByType.set(type, currIndex + 1);
        return `${type}-${currIndex}`;
    }
}