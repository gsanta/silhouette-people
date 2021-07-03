import { Tools } from "babylonjs";
import { GameObjectConfig, GameObjectTag } from "../../../model/objects/game_object/GameObject";
import { GameObjectStore } from "../../../store/GameObjectStore";
import { toStrVector } from "../../import/AbstractPropertyParser";

export class GameObjectExporter {

    private readonly gameObjectStore: GameObjectStore;

    constructor(gameObjectStore: GameObjectStore) {
        this.gameObjectStore = gameObjectStore;
    }

    export(): GameObjectConfig[] {
        const gameObjects = this.gameObjectStore.getByTag(GameObjectTag._UI_CREATED);
        const gameObjectJsons = gameObjects.map(gameObject => gameObject.config);
        gameObjects.forEach(gameObject => gameObject.config.position = toStrVector(gameObject.mainMesh.getAbsolutePosition()))
        gameObjects.forEach(gameObject => gameObject.config.rotate = Tools.ToDegrees(gameObject.rotationY));

        return gameObjectJsons;
    }
}