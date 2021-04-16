import { MeshObj, GameObjectJson, MeshObjType } from "../../model/general/objs/MeshObj";
import { WorldObj } from "../../model/general/objs/WorldObj";
import { Lookup } from "../Lookup";
import { AbstractFeatureParser } from "../../model/general/factories/AbstractFeactureParser";
import { ActivePlayerFeatureParser } from "../../model/general/factories/features/ActivePlayerFeatureParser";
import { AddonFeatureParser } from "../../model/general/factories/features/AddonFeatureParser";
import { CollisionFeatureParser } from "../../model/general/factories/features/CollisionFeatureParser";
import { IdFeatureParser } from "../../model/general/factories/features/IdFeatureParser";
import { ModelFeatureParser } from "../../model/general/factories/features/ModelFeatureParser";
import { PhysicsFeatureParser } from "../../model/general/factories/features/PhysicsFeatureParser";
import { PositionFeatureParser } from "../../model/general/factories/features/PositionFeatureParser";
import { RotateFeatureParser } from "../../model/general/factories/features/RotateFeatureParser";
import { StateFeatureParser } from "../../model/general/factories/features/StateFeatureParser";
import { TagFeatureParser } from "../../model/general/factories/features/TagFeatureParser";
import { TextureFeatureParser } from "../../model/general/factories/features/TextureFeatureParser";
import { InjectProperty } from "../../di/diDecorators";
import { ActivePlayerService } from "../ActivePlayerService";

export class MeshFactory {
    
    @InjectProperty("ActivePlayerService")
    private activePlayerService: ActivePlayerService;
    
    private lookup: Lookup;
    private indexesByType: Map<string, number> = new Map();
    private featureFactories: AbstractFeatureParser[] = [];

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

    private async processFeature(factory: AbstractFeatureParser, gameObj: MeshObj, feature: string): Promise<void> {
        const [_featureName, ...attrs] = feature.split(' ').map(str => str.trim());
        if (factory.isAsync()) {
            await factory.processFeatureAsync(gameObj, attrs);
        } else {
            factory.processFeature(gameObj, attrs);
        }
    }

    private createFeatureFactories(worldObj: WorldObj) {
        this.featureFactories = [
            new ModelFeatureParser(worldObj, this.lookup),
            new PositionFeatureParser(),
            new TextureFeatureParser(this.lookup),
            new CollisionFeatureParser(worldObj, this.lookup),
            new PhysicsFeatureParser(this.lookup),
            new StateFeatureParser(),
            new TagFeatureParser(),
            new AddonFeatureParser(this.lookup),
            new RotateFeatureParser(),
            new IdFeatureParser(),
            new ActivePlayerFeatureParser(this.activePlayerService)
        ];
    }

    private generateId(type: MeshObjType) {
        const currIndex = this.indexesByType.get(type) || 0;
        this.indexesByType.set(type, currIndex + 1);
        return `${type}-${currIndex}`;
    }
}