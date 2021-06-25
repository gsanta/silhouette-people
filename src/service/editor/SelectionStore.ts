import { GameObject } from "../../model/objects/game_object/GameObject";


export class SelectionStore {

    private selectedItems: GameObject[] = [];

    add(gameObject: GameObject) {
        this.selectedItems.push(gameObject);
    }

    removeAll() {
        this.selectedItems = [];
    }

    getAll(): GameObject[] {
        return this.selectedItems;
    }
}