import { MeshObj, GameObjectJson, MeshObjType } from "../../../model/object/mesh/MeshObj";
import { WorldObj } from "../../../model/object/WorldObj";
import { Lookup } from "../../Lookup";
import { AbstractPropertyParser } from "../../base/import/AbstractPropertyParser";
import { ActivePlayerPropertyParser } from "../../base/import/ActivePlayerPropertyParser";
import { CollisionPropertyParser } from "../../base/import/CollisionPropertyParser";
import { IdPropertyParser } from "../../base/import/IdPropertyParser";
import { ModelPropertyParser } from "../../base/import/ModelPropertyParser";
import { PhysicsPropertyParser } from "../../base/import/PhysicsPropertyParser";
import { PositionPropertyParser } from "../../base/import/PositionPropertyParser";
import { RotatePropertyParser } from "../../base/import/RotatePropertyParser";
import { StatePropertyParser } from "../../base/import/StatePropertyParser";
import { TagPropertyParser } from "../../base/import/TagPropertyParser";
import { TexturePropertyParser } from "../../base/import/TexturePropertyParser";
import { InjectProperty } from "../../../di/diDecorators";
import { ActivePlayerService } from "../../ActivePlayerService";
import { HiddenPropertyParser } from "../../base/import/HiddenPropertyParser";
import { WalkerPropertyParser } from "../../base/import/WalkerPropertyParser";
import { WorldProvider } from "../world/WorldProvider";
import { AssetContainerStore } from "../../../store/AssetContainerStore";
import { InputManagerPropertyParser } from "../../base/import/InputManagerPropertyParser";
import { KeyboardService } from "../../base/keyboard/KeyboardService";

export class MeshFactory {
    
    @InjectProperty("ActivePlayerService")
    private activePlayerService: ActivePlayerService;
    
    @InjectProperty("WorldProvider")
    private worldProvider: WorldProvider;

    @InjectProperty("MeshInstanceStore")
    private meshInstanceStore: AssetContainerStore;

    @InjectProperty("KeyboardService")
    private keyboardService: KeyboardService;

    private lookup: Lookup;
    private indexesByType: Map<string, number> = new Map();
    private featureFactories: AbstractPropertyParser[] = [];

    constructor(lookup: Lookup) {
        this.lookup = lookup;
        this.worldProvider = lookup.worldProvider;
        this.meshInstanceStore = lookup.assetContainerStore;
        this.activePlayerService = lookup.activePlayerService;
        this.keyboardService = lookup.keyboard;
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
            new ModelPropertyParser(worldObj, this.worldProvider, this.meshInstanceStore),
            new TexturePropertyParser(this.lookup),
            new PositionPropertyParser(),  
            new CollisionPropertyParser(worldObj, this.lookup),
            new PhysicsPropertyParser(this.lookup),
            new StatePropertyParser(),
            new WalkerPropertyParser(),
            new InputManagerPropertyParser(this.keyboardService),
            new TagPropertyParser(),
            new HiddenPropertyParser(),
            new RotatePropertyParser(),
            new IdPropertyParser(),
            new ActivePlayerPropertyParser(this.activePlayerService),
        ];
    }

    private generateId(type: MeshObjType) {
        const currIndex = this.indexesByType.get(type) || 0;
        this.indexesByType.set(type, currIndex + 1);
        return `${type}-${currIndex}`;
    }
}