import { InjectProperty } from "../di/diDecorators";
import { PersonItem } from "../model/item/character/CharacterItem";
import { MeshItem, MeshItemTag } from "../model/item/mesh/MeshItem";
import { lookup } from "../service/Lookup";
import { QuarterStore } from "./QuarterStore";

export class MeshStore {
    private items: MeshItem[] = [];

    @InjectProperty("QuarterStore")
    private quarterStore: QuarterStore;

    constructor() {
        this.quarterStore = lookup.quarterStore;
    }

    addItem(gameObject: MeshItem) {
        this.items.push(gameObject);

        const quarterIndex = this.calcQuarterIndex(gameObject);
        gameObject.quarterIndex = quarterIndex;
    }

    removeItem(item: MeshItem, disposeMesh = false) {
        this.items = this.items.filter(i => i !== item);
        if (disposeMesh) {
            item.dispose();
        }
    }

    getEnemies(): PersonItem[] {
        return <PersonItem[]> this.getByTag(MeshItemTag.Enemy);
    }

    getByTag(tag: MeshItemTag): MeshItem[] {
        return this.items.filter(gameObj => gameObj.tag.has(tag));
    }

    getById(id: string) {
        return this.items.find(obj => obj.id === id);
    }

    getAll(): MeshItem[] {
        return this.items;
    }

    dispose() {
        this.items.forEach(obj => obj.dispose());
    }

    private calcQuarterIndex(obj: MeshItem): number {
        const pos = obj.instance.getPosition2D();

        const quarterIndex = this.quarterStore.getAllQuarters().findIndex(quarter => quarter.containsPoint2D(pos));
        return quarterIndex;
    }
}