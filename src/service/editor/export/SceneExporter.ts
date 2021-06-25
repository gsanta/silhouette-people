import { Tools } from 'babylonjs';
import { GameObjectConfig, GameObjectTag } from '../../../model/objects/game_object/GameObject';
import { GameObjectStore } from '../../../store/GameObjectStore';
import { toStrVector } from '../../import/AbstractPropertyParser';

export interface SceneJson {

    gameObjects: GameObjectConfig[];
}

export class SceneExporter {

    private readonly gameObjectStore: GameObjectStore;

    constructor(gameObjectStore: GameObjectStore) {
        this.gameObjectStore = gameObjectStore;
    }

    async export(): Promise<void> {

        const gameObjects = this.gameObjectStore.getByTag(GameObjectTag._UI_CREATED);
        const gameObjectJsons = gameObjects.map(gameObject => gameObject.config);
        gameObjects.forEach(gameObject => gameObject.config.position = toStrVector(gameObject.meshes[0].getAbsolutePosition()))
        gameObjects.forEach(gameObject => gameObject.config.rotate = Tools.ToDegrees(gameObject.rotationY));

        const json: SceneJson = {
            gameObjects: gameObjectJsons
        }

        console.log(JSON.stringify(json, null, 2))
    }
}