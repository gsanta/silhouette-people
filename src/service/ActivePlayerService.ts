import { InjectProperty } from "../di/diDecorators";
import { HighlightHelper } from "../model/HighlightHelper";
import { MeshItem } from "../model/item/mesh/MeshItem";
import { lookup } from "./Lookup";
import { PlayerStore } from "./player/PlayerStore";

export class ActivePlayerService {

    @InjectProperty("MeshStore")
    private playerStore: PlayerStore;

    private highlightHelper: HighlightHelper;

    constructor() {
        this.playerStore = lookup.playerStore;
        this.highlightHelper = new HighlightHelper();
    }

    activate(player: MeshItem) {
        this.deactivate();
        this.highlightHelper.attachHighlightTo(player);
        player.isActivePlayer = true;
    }

    deactivate() {
        const activePlayer = this.playerStore.getActivePlayer();
        if (activePlayer) {
            activePlayer.isActivePlayer = false;
        }
    }
}