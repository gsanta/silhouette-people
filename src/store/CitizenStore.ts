import { InjectProperty } from "../di/diDecorators";
import { MeshItem, MeshItemTag } from "../model/item/mesh/MeshItem";
import { lookup } from "../service/Lookup";
import { MeshStore } from "./MeshStore";

export class CitizenStore {
    @InjectProperty('MeshStore')
    private meshStore: MeshStore;

    constructor() {
        this.meshStore = lookup.meshStore;
    }

    addItem(item: MeshItem) {
        this.meshStore.addItem(item);
    }

    getById(id: string): MeshItem {
        return this.getAll().filter(item => item.id === id)[0];
    }

    getAll(): MeshItem[] {
        return <MeshItem[]> this.meshStore.getByTag(MeshItemTag.Citizen);
    }

    removeItem(citizen: MeshItem, disposeMesh = false) {
        this.meshStore.removeItem(citizen, disposeMesh);
    }
}