import { PlayerStore } from "./player/PlayerStore";

export class RenderGuiService {
    private renderer: () => void;

    private readonly playerStore: PlayerStore;

    constructor(playerStore: PlayerStore) {
        this.playerStore = playerStore;
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

        // this.playerStore.getPlayers().forEach(player => {
        //     if (player.stateController.state.isDirty()) {
        //         player.stateController.state.clearDirty();
        //         dirtyFound = true;
        //     }
        // });

        // this.playerStore.getBikes().forEach(bike => {
        //     if (bike.stateController.state.isDirty()) {
        //         bike.stateController.state.clearDirty();
        //         dirtyFound = true;
        //     }
        // })

        return dirtyFound;
    }
}