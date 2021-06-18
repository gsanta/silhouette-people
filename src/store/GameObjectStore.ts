import { GameObject, GameObjectTag } from "../model/objects/game_object/GameObject";
import { QuarterStore } from "./QuarterStore";

export class GameObjectStore {
    private items: GameObject[] = [];

    private readonly quarterStore: QuarterStore;

    constructor(quarterStore: QuarterStore) {
        this.quarterStore = quarterStore;
    }

    addItem(meshItem: GameObject) {
        this.items.push(meshItem);

        const quarterIndex = this.calcQuarterIndex(meshItem);
        meshItem.quarterIndex = quarterIndex;
    }

    removeItem(item: GameObject, disposeMesh = false) {
        this.items = this.items.filter(i => i !== item);
        if (disposeMesh) {
            item.dispose();
        }
    }

    getEnemies(): GameObject[] {
        return <GameObject[]> this.getByTag(GameObjectTag.Enemy);
    }

    getByTag(tag: GameObjectTag): GameObject[] {
        return this.items.filter(gameObj => gameObj.tag.has(tag));
    }

    getById(id: string) {
        return this.items.find(obj => obj.id === id);
    }

    getAll(): GameObject[] {
        return this.items;
    }

    dispose() {
        this.items.forEach(obj => obj.dispose());
    }

    private calcQuarterIndex(obj: GameObject): number {
        const pos = obj.position2D;

        const quarterIndex = this.quarterStore.getAllQuarters().findIndex(quarter => quarter.containsPoint2D(pos));
        return quarterIndex;
    }
}