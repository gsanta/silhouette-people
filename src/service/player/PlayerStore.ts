import { InjectProperty } from "../../di/diDecorators";
import { GameObject, GameObjectTag } from "../../model/objects/game_object/GameObject";
import { MeshStore } from "../../store/MeshStore";
import { lookup } from "../Lookup";

export class PlayerStore {
    @InjectProperty('MeshStore')
    private meshStore: MeshStore;

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