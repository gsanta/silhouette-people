import { BikeStateInfo } from "../../../model/item/bike/BikeState";
import { CharacterItem } from "../../../model/item/character/CharacterItem";
import { MeshConfig, MeshItem, MeshItemTag, MeshObjType } from "../../../model/item/mesh/MeshItem";
import { AbstractPropertyParser } from "../../base/import/AbstractPropertyParser";

export class MeshFactory {
    private readonly indexesByType: Map<string, number> = new Map();
    private propertyParsers: AbstractPropertyParser<any>[] = [];

    setPropertyParsers(propertyParsers: AbstractPropertyParser<any>[]) {
        this.propertyParsers = propertyParsers;
    }

    async createFromConfig(meshConfig: MeshConfig): Promise<MeshItem> {
        const id = this.generateId(meshConfig.type);
        let meshItem: MeshItem 
        
        if (meshConfig.type === MeshObjType.Bicycle1) {
            const character = new CharacterItem(id);
            character.info = new BikeStateInfo();
            meshItem = character;
        } else if (meshConfig.props.tags && meshConfig.props.tags.includes(MeshItemTag.Citizen)) {
            const character = new CharacterItem(id);
            meshItem = character;
        } else {
            meshItem = new MeshItem(id);
        }

        if (meshConfig.props) {
            await this.applyProperties(meshItem, meshConfig);
        }

        return meshItem;
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