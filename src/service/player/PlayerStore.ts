import { InjectProperty } from "../../di/diDecorators";
import { MeshItem, MeshItemTag } from "../../model/item/mesh/MeshItem";
import { MeshStore } from "../../store/MeshStore";
import { lookup } from "../Lookup";

export class PlayerStore {
    @InjectProperty('MeshStore')
    private meshStore: MeshStore;

    constructor() {
        this.meshStore = lookup.meshStore;
    }

    addItem(item: MeshItem) {
        this.meshStore.addItem(item);
    }

    getActivePlayer(): MeshItem {
        return <MeshItem> this.getPlayers().find(player => player.isActivePlayer); 
    }

    getPlayerById(id: string): MeshItem {
        return <MeshItem> this.meshStore.getById(id);
    }

    getPlayers(): MeshItem[] {
        return <MeshItem[]> this.meshStore.getByTag(MeshItemTag.Player);
    }

    getBikes(): MeshItem[] {
        return <MeshItem[]> this.meshStore.getByTag(MeshItemTag.Bicycle);
    }

    removeItem(citizen: MeshItem, disposeMesh = false) {
        this.meshStore.removeItem(citizen, disposeMesh);
    }
}