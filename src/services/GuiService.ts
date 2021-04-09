import { Lookup } from "./Lookup";
import { AdvancedDynamicTexture, StackPanel, Control, Checkbox, TextBlock } from 'babylonjs-gui';

export class GuiService {
    private lookup: Lookup;
    private renderer: () => void;

    constructor(lookup: Lookup) {
        this.lookup = lookup;
    }

    setGuiRenderer(renderer: () => void) {
        this.renderer = renderer;
    }

    renderGui(forced: boolean = false) {
        if (forced || this.processDirtyObjs()) {
            this.renderer && this.renderer();
        }
    }

    private processDirtyObjs(): boolean {
        let dirtyFound = false;
        this.lookup.activeObj.getAllGameObjects().forEach(obj => {
            if (obj.data.isDirty()) {
                obj.data.clearDirty();
                dirtyFound = true;
            }
        });
        return dirtyFound;
    }
}