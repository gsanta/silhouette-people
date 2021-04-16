import { InjectProperty } from "../di/diDecorators";
import { CharacterIdleState } from "../model/character/states/CharacterIdleState";
import { Character } from "../model/general/objs/MeshObj";
import { HighlightHelper } from "../model/highlight/HighlightHelper";
import { MeshStore } from "../stores/MeshStore";
import { lookup } from "./Lookup";

export class ActivePlayerService {

    @InjectProperty("MeshStore")
    private meshStore: MeshStore;

    private highlightHelper: HighlightHelper;

    constructor() {
        this.meshStore = lookup.meshStore;
        this.highlightHelper = new HighlightHelper();
    }

    activate(player: Character) {
        this.deactivate();
        this.highlightHelper.attachHighlightTo(player);
        player.isActivePlayer = true;
    }

    deactivate() {
        const activePlayer = this.meshStore.getActivePlayer();
        if (activePlayer) {
            activePlayer.state = new CharacterIdleState(activePlayer);
            activePlayer.isActivePlayer = false;
        }
    }
}