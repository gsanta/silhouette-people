import { InjectProperty } from "../di/diDecorators";
import { MeshStore } from "../stores/MeshStore";
import { lookup } from "./Lookup";

export class RenderGuiService {
    private renderer: () => void;

    @InjectProperty("MeshStore")
    private meshStore: MeshStore;

    constructor() {
        this.meshStore = lookup.meshStore;
    }

    setGuiRenderer(renderer: () => void) {
        this.renderer = renderer;
    }

    render(forced: boolean = false) {
        if (forced || this.processDirtyObjs()) {
            this.renderer && this.renderer();
        }
    }

    private processDirtyObjs(): boolean {
        let dirtyFound = false;

        this.meshStore.getPlayers().forEach(player => {
            if (player.state.isDirty()) {
                player.state.clearDirty();
                dirtyFound = true;
            }
        });

        this.meshStore.getBikes().forEach(bike => {
            if (bike.state.isDirty()) {
                bike.state.clearDirty();
                dirtyFound = true;
            }
        })

        return dirtyFound;
    }
}