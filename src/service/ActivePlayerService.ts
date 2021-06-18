import { HighlightHelper } from "../model/HighlightHelper";
import { GameObject } from "../model/objects/game_object/GameObject";
import { LightStore } from "../store/LightStore";
import { LightFactory } from "./object/LightFactory";
import { PlayerStore } from "./player/PlayerStore";

export class ActivePlayerService {

    private readonly playerStore: PlayerStore;
    private readonly highlightHelper: HighlightHelper;

    constructor(playerStore: PlayerStore, lightStore: LightStore, lightFactory: LightFactory) {
        this.playerStore = playerStore;
        this.highlightHelper = new HighlightHelper(lightStore, lightFactory);
    }

    activate(player: GameObject) {
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