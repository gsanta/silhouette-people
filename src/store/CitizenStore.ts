import { InjectProperty } from "../di/diDecorators";
import { GameObject, GameObjectTag } from "../model/objects/game_object/GameObject";
import { lookup } from "../service/Lookup";
import { GameObjectStore } from "./GameObjectStore";

export class CitizenStore {
    @InjectProperty('MeshStore')
    private meshStore: GameObjectStore;

    constructor() {
        this.meshStore = lookup.meshStore;
    }

    addItem(item: GameObject) {
        this.meshStore.addItem(item);
    }

    getById(id: string): GameObject {
        return this.getAll().filter(item => item.id === id)[0];
    }

    getAll(): GameObject[] {
        return <GameObject[]> this.meshStore.getByTag(GameObjectTag.Citizen);
    }

    removeItem(citizen: GameObject, disposeMesh = false) {
        this.meshStore.removeItem(citizen, disposeMesh);
    }
}