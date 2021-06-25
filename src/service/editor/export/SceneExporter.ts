import fs from 'fs';
import { GameObjectTag } from '../../../model/objects/game_object/GameObject';
import { GameObjectStore } from '../../../store/GameObjectStore';

export class SceneExporter {

    private readonly gameObjectStore: GameObjectStore;

    constructor(gameObjectStore: GameObjectStore) {
        this.gameObjectStore = gameObjectStore;
    }

    async export(): Promise<void> {
        
        const gameObjects = this.gameObjectStore.getByTag(GameObjectTag._UI_CREATED);
        debugger;
    }
}