import { InjectProperty } from "../../di/diDecorators";
import { MeshStore } from "../../store/MeshStore";
import { lookup } from "../Lookup";

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

        this.meshStore.getPlayers().forEach(player => {
            if (player.animationState.isDirty()) {
                player.animationState.clearDirty();
                dirtyFound = true;
            }
        });

        this.meshStore.getBikes().forEach(bike => {
            if (bike.animationState.isDirty()) {
                bike.animationState.clearDirty();
                dirtyFound = true;
            }
        })

        return dirtyFound;
    }
}