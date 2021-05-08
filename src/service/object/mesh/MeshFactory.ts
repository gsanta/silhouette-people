import { InjectProperty } from "../../../di/diDecorators";
import { MeshConfig, MeshItem, MeshObjType } from "../../../model/item/mesh/MeshItem";
import { AbstractPropertyParser } from "../../base/import/AbstractPropertyParser";
import { lookup } from "../../Lookup";
import { WorldProvider } from "../world/WorldProvider";

export class MeshFactory {

    @InjectProperty('WorldProvider')
    private worldProvider: WorldProvider;
    
    private readonly indexesByType: Map<string, number> = new Map();
    private propertyParsers: AbstractPropertyParser<any>[] = [];

    constructor() {
        this.worldProvider = lookup.worldProvider;
    }

    setPropertyParsers(propertyParsers: AbstractPropertyParser<any>[]) {
        this.propertyParsers = propertyParsers;
    }

    async create(gameObjectJson: MeshConfig): Promise<MeshItem> {
        const id = this.generateId(gameObjectJson.type);
        const gameObject = new MeshItem(id, this.worldProvider.world);

        if (gameObjectJson.props) {
            await this.applyProperties(gameObject, gameObjectJson);
        }

        return gameObject;
    }

    
    private async applyProperties(gameObj: MeshItem, meshConfig: MeshConfig) {
        const { props } = meshConfig;

        for (let propertyParser of this.propertyParsers) {
            if (props[propertyParser.propName] !== undefined) {
                if (propertyParser.isAsync()) {
                    await propertyParser.processPropertyAsync(gameObj, props[propertyParser.propName]);
                } else {
                    propertyParser.processProperty(gameObj, props[propertyParser.propName]);
                }
            }
        }
    }

    private generateId(type: MeshObjType) {
        const currIndex = this.indexesByType.get(type) || 0;
        this.indexesByType.set(type, currIndex + 1);
        return `${type}-${currIndex}`;
    }
}