import { Control, StackPanel } from "babylonjs-gui";
import { AdvancedDynamicTexture } from "babylonjs-gui/2D/advancedDynamicTexture";
import { ColliderCheckbox } from "./ColliderCheckbox";
import { FPSComponent } from "./FPSComponent";
import { IGUIComponent } from "./IGUIComponent";
import { MeshBoundingBoxCheckbox } from "./MeshBoundingBoxCheckbox";
import { PlayerRadioButtonGroup } from "./PlayerRadioButtonGroup";
import { WorldAxisCheckbox } from "./WorldAxisCheckbox";

export class DebugPanel implements IGUIComponent {
    private children: IGUIComponent[] = [];

    constructor() {
        this.children.push(new FPSComponent());
        this.children.push(new ColliderCheckbox());
        this.children.push(new WorldAxisCheckbox());
        this.children.push(new MeshBoundingBoxCheckbox());
        this.children.push(new PlayerRadioButtonGroup());

    }

    render(parent: AdvancedDynamicTexture) {
        var panel = new StackPanel();
        panel.width = "300px";
        panel.left = '20px';
        panel.top = '20px';
        panel.isVertical = true;
        panel.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
        panel.verticalAlignment = Control.VERTICAL_ALIGNMENT_TOP;
        parent.addControl(panel);

        this.children.forEach(child => child.render(panel));
    }
}