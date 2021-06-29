import { GameObject, GameObjectTag } from "../model/objects/game_object/GameObject";
import { MeshStore } from "./MeshStore";
import { QuarterStore } from "./QuarterStore";

export class GameObjectStore {
    private items: GameObject[] = [];

    private readonly quarterStore: QuarterStore;
    private readonly meshStore: MeshStore;

    constructor(quarterStore: QuarterStore, meshStore: MeshStore) {
        this.quarterStore = quarterStore;
        this.meshStore = meshStore;
    }

    addItem(meshItem: GameObject) {
        this.items.push(meshItem);

        const quarterIndex = this.calcQuarterIndex(meshItem);
        meshItem.quarterIndex = quarterIndex;
    }

    removeItem(item: GameObject, disposeMesh = false) {
        this.items = this.items.filter(i => i !== item);
        if (disposeMesh) {
            this.meshStore.removeGameObjectMeshes(item);
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