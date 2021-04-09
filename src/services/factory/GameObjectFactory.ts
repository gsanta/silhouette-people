import { Axis, Color3, Mesh, MeshBuilder, PhysicsImpostor, Space, StandardMaterial, Vector3 } from "babylonjs";
import { WorldObj } from "../../model/objs/WorldObj";
import { GameObj, GameObjectJson, GameObjectType } from "../../model/objs/GameObj";
import { Lookup } from "../Lookup";
import { GroundJson } from "../district/WorldJson";
import { AbstractFactoryFeature } from "./features/AbstractFactoryFeacture";
import { AddonFactoryFeature } from "./features/AddonFactoryFeature";
import { CollisionFactoryFeature } from "./features/CollisionFactoryFeature";
import { ModelFactoryFeature } from "./features/ModelFactoryFeature";
import { PhysicsFactoryFeature } from "./features/PhysicsFactoryFeature";
import { PositionFactoryFeature } from "./features/PositionFactoryFeature";
import { RotateFactoryFeature } from "./features/RotateFactoryFeature";
import { StateFactoryFeature } from "./features/StateFactoryFeature";
import { TagFactoryFeature } from "./features/TagFactoryFeature";
import { TextureFactoryFeature } from "./features/TextureFactoryFeature";
import { Vector2 } from "babylonjs/Maths/math.vector";
import { QuarterObj } from "../../model/objs/QuarterObj";

export class GameObjectFactory {
    private worldObj: WorldObj;
    private lookup: Lookup;
    private indexesByType: Map<string, number> = new Map();

    featureFactories: AbstractFactoryFeature[] = [];

    constructor(worldObj: WorldObj, lookup: Lookup) {
        this.worldObj = worldObj;
        this.lookup = lookup;

        this.featureFactories = [
            new ModelFactoryFeature(worldObj, lookup),
            new PositionFactoryFeature(),
            new TextureFactoryFeature(lookup),
            new CollisionFactoryFeature(worldObj, lookup),
            new PhysicsFactoryFeature(lookup),
            new StateFactoryFeature(lookup),
            new TagFactoryFeature(),
            new AddonFactoryFeature(lookup),
            new RotateFactoryFeature()
        ];
    }

    async create(gameObjectJson: GameObjectJson): Promise<GameObj> {
        const id = this.generateId(gameObjectJson.type);
        const gameObject = new GameObj(id, this.lookup);

        gameObject.type = gameObjectJson.type;
        gameObject.ch = gameObjectJson.ch;
        gameObject.district = this.worldObj;

        if (gameObjectJson.features) {
            await this.processFeatureList(gameObject, gameObjectJson);
        }

        return gameObject;
    }

    createDistrictBorder(): GameObj {
        const id = this.generateId(GameObjectType.DistrictBorder);
        const gameObject = new GameObj(id, this.lookup);

        gameObject.type = GameObjectType.DistrictBorder;

        const myShape = [
            new Vector3(2, 0, 0),
            new Vector3(2.025, 0, 0),
            new Vector3(2.025, 0.2, 0),
            new Vector3(2, 0.2, 0)
        ];

        const mat = new StandardMaterial("mat", this.lookup.scene);
        mat.diffuseColor = Color3.Red();
        mat.alpha = 0.2;
        const lathe = MeshBuilder.CreateLathe("lathe", {shape: myShape, radius: this.worldObj.size.x / 3 + 2, tessellation:4, sideOrientation: Mesh.DOUBLESIDE});
        lathe.rotate(Axis.Y, Math.PI / 4, Space.WORLD);
        lathe.convertToFlatShadedMesh();

        // lathe.translate(Axis.X, this.worldObj.centerPoint.x, Space.WORLD); 
        // lathe.translate(Axis.Z, this.worldObj.centerPoint.y, Space.WORLD); 

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

    createGround(size: number): Mesh {
        const ground = MeshBuilder.CreateBox('ground', { width: size, depth: size, height: 0.2 });
        ground.translate(Axis.Y, -0.21, Space.WORLD);
        const material = new StandardMaterial(`ground--material`, this.lookup.scene);
        material.diffuseColor = Color3.FromHexString('#FFFFFF');
        material.specularColor = new Color3(0, 0, 0);
        ground.material = material;

        ground.physicsImpostor = new PhysicsImpostor(ground, PhysicsImpostor.BoxImpostor, { mass: 0 }, this.lookup.scene);

        return ground;
    }


    createQuarterGround(groundJson: GroundJson, quarterPos: Vector2): void {
        const id = `ground-${quarterPos.x}-${quarterPos.y}`;
        const size = this.worldObj.quarterSize;
        const ground = MeshBuilder.CreateGround(id, { width: size.x, height: size.y });
        
        const material = new StandardMaterial(`${id}-material`, this.lookup.scene);
        material.diffuseColor = Color3.FromHexString(groundJson.color);
        material.specularColor = new Color3(0, 0, 0);
        ground.material = material;
        

        const translateX = quarterPos.x * size.x + size.x / 2;
        const translateY = quarterPos.y * size.y - size.y / 2;

        ground.translate(new Vector3(translateX, 0, translateY), 1, Space.WORLD);
        ground.parent = this.worldObj.basicComp.platform;
        ground.translate(Axis.Y, 0.2, Space.WORLD);

        const quarter = new QuarterObj(this.worldObj, ground);
        this.worldObj.quarter.addQuarter(quarter);
    }

    private generateId(type: GameObjectType) {
        const currIndex = this.indexesByType.get(type) || 0;
        this.indexesByType.set(type, currIndex + 1);
        return `${type}-${currIndex}`;
    }
}