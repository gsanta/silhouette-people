import { Mesh } from "babylonjs";
import { GameObjectConfig, GameObject, GameObjectTag, GameObjectType } from "../../../model/objects/game_object/GameObject";
import { MeshStore } from "../../../store/MeshStore";
import { AbstractPropertyParser } from "../../import/AbstractPropertyParser";
import { CollisionPropertyParser } from "../../import/parsers/CollisionPropertyParser";
import { ModelPropertyParser } from "../../import/parsers/ModelPropertyParser";
import { PositionPropertyParser } from "../../import/parsers/PositionPropertyParser";
import { TagPropertyParser } from "../../import/parsers/TagPropertyParser";

export class MeshFactory {
    private readonly meshStore: MeshStore;
    private readonly indexesByType: Map<string, number> = new Map();
    private propertyParsers: AbstractPropertyParser<any>[] = [];
    private readonly modelPropertyParser: ModelPropertyParser;
    private readonly collisionPropertyParser: CollisionPropertyParser;
    private readonly positionPropertyParser: PositionPropertyParser;
    private readonly tagPropertyParser: TagPropertyParser;

    constructor(
        meshStore: MeshStore, 
        modelPropertyParser: ModelPropertyParser,
        collisionPropertyParser: CollisionPropertyParser,
        positionPropertyParser: PositionPropertyParser,
        tagPropertyParser: TagPropertyParser
    ) {
        this.modelPropertyParser = modelPropertyParser;
        this.collisionPropertyParser = collisionPropertyParser;
        this.positionPropertyParser = positionPropertyParser;
        this.tagPropertyParser = tagPropertyParser;
        this.meshStore = meshStore;
    }

    setPropertyParsers(propertyParsers: AbstractPropertyParser<any>[]) {
        this.propertyParsers = propertyParsers;
    }

    async createFromConfig(gameObjectConfig: GameObjectConfig): Promise<GameObject> {
        const id = this.generateId(gameObjectConfig.type);
        let gameObject: GameObject;

        if (gameObjectConfig.type === GameObjectType.Bicycle1) {
            const character = new GameObject(id);
            gameObject = character;
        } else if (gameObjectConfig.props.tags && gameObjectConfig.props.tags.includes(GameObjectTag.Citizen)) {
            const character = new GameObject(id);
            gameObject = character;
        } else {
            gameObject = new GameObject(id);
        }

        await this.modelPropertyParser.processPropertyAsync(gameObject, gameObjectConfig.model);
        
        if (gameObjectConfig.position) {
            await this.positionPropertyParser.processPropertyAsync(gameObject, gameObjectConfig.position);
        }

        if (gameObjectConfig.collider) {
            await this.collisionPropertyParser.processPropertyAsync(gameObject, gameObjectConfig.collider);
        }

        await this.tagPropertyParser.processPropertyAsync(gameObject, gameObjectConfig.tags);

        if (gameObjectConfig.props) {
            await this.applyProperties(gameObject, gameObjectConfig);
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