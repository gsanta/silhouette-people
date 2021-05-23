import { InjectProperty } from "../di/diDecorators";
import { CharacterItem } from "../model/item/character/CharacterItem";
import { MeshItemTag } from "../model/item/mesh/MeshItem";
import { lookup } from "../service/Lookup";
import { MeshStore } from "./MeshStore";

export class CitizenStore {
    @InjectProperty('MeshStore')
    private meshStore: MeshStore;

    constructor() {
        this.meshStore = lookup.meshStore;
    }

    addItem(item: CharacterItem) {
        this.meshStore.addItem(item);
    }

    getById(id: string): CharacterItem {
        return this.getAll().filter(item => item.id === id)[0];
    }

    getAll(): CharacterItem[] {
        return <CharacterItem[]> this.meshStore.getByTag(MeshItemTag.Citizen);
    }

    removeItem(citizen: CharacterItem, disposeMesh = false) {
        this.meshStore.removeItem(citizen, disposeMesh);
    }
}