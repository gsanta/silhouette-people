import { InjectProperty } from "../di/diDecorators";
import { WorldProvider } from "../stores/WorldProvider";
import { lookup } from "./Lookup";

export class RenderGuiService {
    private renderer: () => void;

    @InjectProperty("WorldProvider")
    private worldProvider: WorldProvider;

    constructor() {
        this.worldProvider = lookup.worldProvider;
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
        const { world } = this.worldProvider;
        if (!world) { return false } 

        let dirtyFound = false;

        world.obj.getAll().forEach(obj => {
            if (obj.data.isDirty()) {
                obj.data.clearDirty();
                dirtyFound = true;
            }
        });

        return dirtyFound;
    }
}