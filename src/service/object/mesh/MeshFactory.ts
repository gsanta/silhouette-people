import { BikeBehaviour } from "../../../model/item/game_object/behaviour/BikeBehaviour";
import { GameObjectConfig, GameObject, GameObjectTag, GameObjectType } from "../../../model/objects/game_object/GameObject";
import { AbstractPropertyParser } from "../../base/import/AbstractPropertyParser";

export class MeshFactory {
    private readonly indexesByType: Map<string, number> = new Map();
    private propertyParsers: AbstractPropertyParser<any>[] = [];

    setPropertyParsers(propertyParsers: AbstractPropertyParser<any>[]) {
        this.propertyParsers = propertyParsers;
    }

    async createFromConfig(meshConfig: GameObjectConfig): Promise<GameObject> {
        const id = this.generateId(meshConfig.type);
        let meshItem: GameObject 
        
        if (meshConfig.type === GameObjectType.Bicycle1) {
            const character = new GameObject(id);
            character.behaviour = new BikeBehaviour();
            meshItem = character;
        } else if (meshConfig.props.tags && meshConfig.props.tags.includes(GameObjectTag.Citizen)) {
            const character = new GameObject(id);
            meshItem = character;
        } else {
            meshItem = new GameObject(id);
        }

        if (meshConfig.props) {
            await this.applyProperties(meshItem, meshConfig);
        }

        return meshItem;
    }

    
    private async applyProperties(gameObj: GameObject, meshConfig: GameObjectConfig) {
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

    private generateId(type: GameObjectType) {
        const currIndex = this.indexesByType.get(type) || 0;
        this.indexesByType.set(type, currIndex + 1);
        return `${type}-${currIndex}`;
    }
}