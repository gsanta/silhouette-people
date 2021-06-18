import { GameObject, GameObjectTag } from "../model/objects/game_object/GameObject";
import { GameObjectStore } from "./GameObjectStore";

export class CitizenStore {
    private readonly gameObjectStore: GameObjectStore;

    constructor(gameObjectStore: GameObjectStore) {
        this.gameObjectStore = gameObjectStore;
    }

    addItem(item: GameObject) {
        this.gameObjectStore.addItem(item);
    }

    getById(id: string): GameObject {
        return this.getAll().filter(item => item.id === id)[0];
    }

    getAll(): GameObject[] {
        return <GameObject[]> this.gameObjectStore.getByTag(GameObjectTag.Citizen);
    }

    removeItem(citizen: GameObject, disposeMesh = false) {
        this.gameObjectStore.removeItem(citizen, disposeMesh);
    }
}