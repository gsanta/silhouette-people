import { MeshObj, GameObjectJson, MeshObjType } from "../../model/general/objs/MeshObj";
import { WorldObj } from "../../model/general/objs/WorldObj";
import { Lookup } from "../Lookup";
import { AbstractPropertyParser } from "../../model/general/factories/AbstractPropertyParser";
import { ActivePlayerPropertyParser } from "../../model/general/factories/features/ActivePlayerPropertyParser";
import { CollisionPropertyParser } from "../../model/general/factories/features/CollisionPropertyParser";
import { IdPropertyParser } from "../../model/general/factories/features/IdPropertyParser";
import { ModelPropertyParser } from "../../model/general/factories/features/ModelPropertyParser";
import { PhysicsPropertyParser } from "../../model/general/factories/features/PhysicsPropertyParser";
import { PositionPropertyParser } from "../../model/general/factories/features/PositionPropertyParser";
import { RotatePropertyParser } from "../../model/general/factories/features/RotatePropertyParser";
import { StatePropertyParser } from "../../model/general/factories/features/StatePropertyParser";
import { TagPropertyParser } from "../../model/general/factories/features/TagPropertyParser";
import { TexturePropertyParser } from "../../model/general/factories/features/TexturePropertyParser";
import { InjectProperty } from "../../di/diDecorators";
import { ActivePlayerService } from "../ActivePlayerService";
import { HiddenPropertyParser } from "../../model/general/factories/features/HiddenPropertyParser";
import { WalkerPropertyParser } from "../../model/general/factories/features/WalkerPropertyParser";

export class MeshFactory {
    
    @InjectProperty("ActivePlayerService")
    private activePlayerService: ActivePlayerService;
    
    private lookup: Lookup;
    private indexesByType: Map<string, number> = new Map();
    private featureFactories: AbstractPropertyParser[] = [];

    constructor(lookup: Lookup) {
        this.lookup = lookup;
        this.activePlayerService = lookup.activePlayerService;
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

    private async processFeature(factory: AbstractPropertyParser, gameObj: MeshObj, feature: string): Promise<void> {
        const [_featureName, ...attrs] = feature.split(' ').map(str => str.trim());
        if (factory.isAsync()) {
            await factory.processFeatureAsync(gameObj, attrs);
        } else {
            factory.processFeature(gameObj, attrs);
        }
    }

    private createFeatureFactories(worldObj: WorldObj) {
        this.featureFactories = [
            new ModelPropertyParser(worldObj, this.lookup),
            new PositionPropertyParser(),
            new TexturePropertyParser(this.lookup),
            new CollisionPropertyParser(worldObj, this.lookup),
            new PhysicsPropertyParser(this.lookup),
            new StatePropertyParser(),
            new WalkerPropertyParser(),
            new TagPropertyParser(),
            new HiddenPropertyParser(),
            new RotatePropertyParser(),
            new IdPropertyParser(),
            new ActivePlayerPropertyParser(this.activePlayerService)
        ];
    }

    private generateId(type: MeshObjType) {
        const currIndex = this.indexesByType.get(type) || 0;
        this.indexesByType.set(type, currIndex + 1);
        return `${type}-${currIndex}`;
    }
}