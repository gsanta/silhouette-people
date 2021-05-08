import { InjectProperty } from "../../di/diDecorators";
import { BikeItem, CharacterItem, PersonItem } from "../../model/item/character/CharacterItem";
import { MeshItemTag } from "../../model/item/mesh/MeshItem";
import { MeshStore } from "../../store/MeshStore";
import { lookup } from "../Lookup";

export class PlayerStore {
    @InjectProperty('MeshStore')
    private meshStore: MeshStore;

    constructor() {
        this.meshStore = lookup.meshStore;
    }

    addItem(item: CharacterItem) {
        this.meshStore.addItem(item);
    }

    getActivePlayer(): PersonItem {
        return <PersonItem> this.getPlayers().find(player => player.isActivePlayer); 
    }

    getPlayerById(id: string): PersonItem {
        return <PersonItem> this.meshStore.getById(id);
    }

    getPlayers(): CharacterItem[] {
        return <CharacterItem[]> this.meshStore.getByTag(MeshItemTag.Player);
    }

    getBikes(): BikeItem[] {
        return <BikeItem[]> this.meshStore.getByTag(MeshItemTag.Bicycle);
    }

    removeItem(citizen: CharacterItem, disposeMesh = false) {
        this.meshStore.removeItem(citizen, disposeMesh);
    }
}