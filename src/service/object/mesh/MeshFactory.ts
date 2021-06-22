import { Mesh } from "babylonjs";
import { GameObjectConfig, GameObject, GameObjectTag, GameObjectType } from "../../../model/objects/game_object/GameObject";
import { MeshStore } from "../../../store/MeshStore";
import { AbstractPropertyParser } from "../../import/AbstractPropertyParser";

export class MeshFactory {
    private readonly meshStore: MeshStore;
    private readonly indexesByType: Map<string, number> = new Map();
    private propertyParsers: AbstractPropertyParser<any>[] = [];

    constructor(meshStore: MeshStore) {
        this.meshStore = meshStore;
    }

    setPropertyParsers(propertyParsers: AbstractPropertyParser<any>[]) {
        this.propertyParsers = propertyParsers;
    }

    async createFromConfig(meshConfig: GameObjectConfig): Promise<GameObject> {
        const id = this.generateId(meshConfig.type);
        let gameObject: GameObject 
        
        if (meshConfig.type === GameObjectType.Bicycle1) {
            const character = new GameObject(id);
            gameObject = character;
        } else if (meshConfig.props.tags && meshConfig.props.tags.includes(GameObjectTag.Citizen)) {
            const character = new GameObject(id);
            gameObject = character;
        } else {
            gameObject = new GameObject(id);
        }

        if (meshConfig.props) {
            await this.applyProperties(gameObject, meshConfig);
        }

        gameObject.meshes.forEach(mesh => this.meshStore.addMesh(gameObject, mesh));
        if (gameObject.dimensionalMesh) {
            this.meshStore.addMesh(gameObject, <Mesh> gameObject.dimensionalMesh);
        }

        return gameObject;
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