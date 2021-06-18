import { InjectProperty } from "../../di/diDecorators";
import { GameObjectStore } from "../../store/GameObjectStore";
import { lookup } from "../Lookup";
import { PlayerStore } from "../player/PlayerStore";

export class RenderGuiService {
    private renderer: () => void;

    @InjectProperty("MeshStore")
    private meshStore: GameObjectStore;

    @InjectProperty("PlayerStore")
    private playerStore: PlayerStore;

    constructor() {
        this.meshStore = lookup.meshStore;
        this.playerStore = lookup.playerStore;
    }

    setGuiRenderer(renderer: () => void) {
        this.renderer = renderer;
    }

    render() {
        this.renderer && this.renderer();
    }

    processDirty() {
        if (this.processDirtyObjs()) {
            this.renderer && this.renderer();
        }
    }

    private processDirtyObjs(): boolean {
        let dirtyFound = false;

        this.playerStore.getPlayers().forEach(player => {
            if (player.stateController.state.isDirty()) {
                player.stateController.state.clearDirty();
                dirtyFound = true;
            }
        });

        this.playerStore.getBikes().forEach(bike => {
            if (bike.stateController.state.isDirty()) {
                bike.stateController.state.clearDirty();
                dirtyFound = true;
            }
        })

        return dirtyFound;
    }
}