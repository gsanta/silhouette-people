import { Control, StackPanel } from "babylonjs-gui";
import { AdvancedDynamicTexture } from "babylonjs-gui/2D/advancedDynamicTexture";
import { Lookup } from "../Lookup";
import { IGUIComponent } from "./IGUIComponent";


export class DebugPanel implements IGUIComponent {

    private children: IGUIComponent[] = [];

    addChild(child: IGUIComponent) {
        this.children.push(child);
    }

    render(parent: AdvancedDynamicTexture, lookup: Lookup) {
        var panel = new StackPanel();
        panel.width = "300px";
        panel.left = '20px';
        panel.top = '20px';
        panel.isVertical = true;
        panel.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
        panel.verticalAlignment = Control.VERTICAL_ALIGNMENT_TOP;
        parent.addControl(panel);

        this.children.forEach(child => child.render(panel, lookup));
    }
}