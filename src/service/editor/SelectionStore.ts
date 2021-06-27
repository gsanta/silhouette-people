import { GameObject } from "../../model/objects/game_object/GameObject";


export class SelectionStore {

    private selectedItems: Set<GameObject> = new Set();

    set(gameObject: GameObject) {
        this.selectedItems.clear();
        this.selectedItems.add(gameObject);
    }

    removeAll() {
        this.selectedItems = new Set();
    }

    getAll(): Set<GameObject> {
        return this.selectedItems;
    }
}