import { GameObject, GameObjectTag } from "../../model/objects/game_object/GameObject";
import { GameObjectStore } from "../../store/GameObjectStore";

export class PlayerStore {
    private readonly gameObjectStore: GameObjectStore;

    constructor(gameObjectStore: GameObjectStore) {
        this.gameObjectStore = gameObjectStore;
    }

    addItem(item: GameObject) {
        this.gameObjectStore.addItem(item);
    }

    getActivePlayer(): GameObject {
        return <GameObject> this.getPlayers().find(player => player.isActivePlayer); 
    }

    getPlayerById(id: string): GameObject {
        return <GameObject> this.gameObjectStore.getById(id);
    }

    getPlayers(): GameObject[] {
        return <GameObject[]> this.gameObjectStore.getByTag(GameObjectTag.Player);
    }

    getBikes(): GameObject[] {
        return <GameObject[]> this.gameObjectStore.getByTag(GameObjectTag.Bicycle);
    }

    removeItem(citizen: GameObject, disposeMesh = false) {
        this.gameObjectStore.removeItem(citizen, disposeMesh);
    }
}