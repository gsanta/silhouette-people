import { InjectProperty } from "../../di/diDecorators";
import { GameObject, GameObjectTag } from "../../model/objects/game_object/GameObject";
import { GameObjectStore } from "../../store/GameObjectStore";
import { lookup } from "../Lookup";

export class PlayerStore {
    @InjectProperty('MeshStore')
    private meshStore: GameObjectStore;

    constructor() {
        this.meshStore = lookup.meshStore;
    }

    addItem(item: GameObject) {
        this.meshStore.addItem(item);
    }

    getActivePlayer(): GameObject {
        return <GameObject> this.getPlayers().find(player => player.isActivePlayer); 
    }

    getPlayerById(id: string): GameObject {
        return <GameObject> this.meshStore.getById(id);
    }

    getPlayers(): GameObject[] {
        return <GameObject[]> this.meshStore.getByTag(GameObjectTag.Player);
    }

    getBikes(): GameObject[] {
        return <GameObject[]> this.meshStore.getByTag(GameObjectTag.Bicycle);
    }

    removeItem(citizen: GameObject, disposeMesh = false) {
        this.meshStore.removeItem(citizen, disposeMesh);
    }
}