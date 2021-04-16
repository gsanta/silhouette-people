import { MeshObj, GameObjectJson, MeshObjType } from "../../model/objs/MeshObj";
import { WorldObj } from "../../model/objs/WorldObj";
import { Lookup } from "../Lookup";
import { AbstractFactoryFeature } from "./features/AbstractFactoryFeacture";
import { ActivePlayerFactoryFeature } from "./features/ActivePlayerFactoryFeature";
import { AddonFactoryFeature } from "./features/AddonFactoryFeature";
import { CollisionFactoryFeature } from "./features/CollisionFactoryFeature";
import { IdFactoryFeature } from "./features/IdFactoryFeature";
import { ModelFactoryFeature } from "./features/ModelFactoryFeature";
import { PhysicsFactoryFeature } from "./features/PhysicsFactoryFeature";
import { PositionFactoryFeature } from "./features/PositionFactoryFeature";
import { RotateFactoryFeature } from "./features/RotateFactoryFeature";
import { StateFactoryFeature } from "./features/StateFactoryFeature";
import { TagFactoryFeature } from "./features/TagFactoryFeature";
import { TextureFactoryFeature } from "./features/TextureFactoryFeature";

export class MeshFactory {
    private lookup: Lookup;
    private indexesByType: Map<string, number> = new Map();

    featureFactories: AbstractFactoryFeature[] = [];

    constructor(lookup: Lookup) {
        this.lookup = lookup;
    }

    async create(gameObjectJson: GameObjectJson, worldObj: WorldObj): Promise<MeshObj> {
        this.createFeatureFactories(worldObj);
        const id = this.generateId(gameObjectJson.type);
        const gameObject = new MeshObj(id, worldObj);

        gameObject.type = gameObjectJson.type;
        gameObject.ch = gameObjectJson.ch;

        if (gameObjectJson.features) {
            await this.processFeatureList(gameObject, gameObjectJson);
        }

        return gameObject;
    }

    private async processFeatureList(gameObj: MeshObj, gameObjectJson: GameObjectJson) {
        for (const feature of gameObjectJson.features) {
            const featureName = feature.split(' ')[0].trim();

            const factory = this.featureFactories.find(featureFactory => featureFactory.feature === featureName);

            if (factory) {
                await this.processFeature(factory, gameObj, feature);
            }
        }
    }

    private async processFeature(factory: AbstractFactoryFeature, gameObj: MeshObj, feature: string): Promise<void> {
        const [_featureName, ...attrs] = feature.split(' ').map(str => str.trim());
        if (factory.isAsync()) {
            await factory.processFeatureAsync(gameObj, attrs);
        } else {
            factory.processFeature(gameObj, attrs);
        }
    }

    private createFeatureFactories(worldObj: WorldObj) {
        this.featureFactories = [
            new ModelFactoryFeature(worldObj, this.lookup),
            new PositionFactoryFeature(),
            new TextureFactoryFeature(this.lookup),
            new CollisionFactoryFeature(worldObj, this.lookup),
            new PhysicsFactoryFeature(this.lookup),
            new StateFactoryFeature(),
            new TagFactoryFeature(),
            new AddonFactoryFeature(this.lookup),
            new RotateFactoryFeature(),
            new IdFactoryFeature(),
            new ActivePlayerFactoryFeature()
        ];
    }

    private generateId(type: MeshObjType) {
        const currIndex = this.indexesByType.get(type) || 0;
        this.indexesByType.set(type, currIndex + 1);
        return `${type}-${currIndex}`;
    }
}