import { InjectProperty } from "../di/diDecorators";
import { CharacterIdleState } from "../model/item/character/states/CharacterIdleState";
import { CharacterItem } from "../model/item/character/CharacterItem";
import { HighlightHelper } from "../model/HighlightHelper";
import { MeshStore } from "../store/MeshStore";
import { lookup } from "./Lookup";

export class ActivePlayerService {

    @InjectProperty("MeshStore")
    private meshStore: MeshStore;

    private highlightHelper: HighlightHelper;

    constructor() {
        this.meshStore = lookup.meshStore;
        this.highlightHelper = new HighlightHelper();
    }

    activate(player: CharacterItem) {
        this.deactivate();
        this.highlightHelper.attachHighlightTo(player);
        player.isActivePlayer = true;
    }

    deactivate() {
        const activePlayer = this.meshStore.getActivePlayer();
        if (activePlayer) {
            activePlayer.isActivePlayer = false;
        }
    }
}