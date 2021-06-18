import { Container, Control, StackPanel, TextBlock } from "babylonjs-gui";
import { InjectProperty } from "../../di/diDecorators";
import { lookup } from "../DependencyResolver";
import { WorldProvider } from "../WorldProvider";
import { IGUIComponent } from "./IGUIComponent";

export class FPSComponent implements IGUIComponent {

    @InjectProperty('WorldProvider')
    worldProvider: WorldProvider;

    private header: TextBlock;

    constructor() {
        this.worldProvider = lookup.worldProvider;

        setInterval(() => {
            if (this.header) {
                this.header.text =  this.worldProvider.world.engine.getFps().toFixed() + " fps";
            }
        }, 100)
    }

    render(parent: Container) {
        const panel = new StackPanel();
        panel.width = "300px";
        panel.height = '30px';
        panel.isVertical = false;
        panel.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
        panel.verticalAlignment = Control.VERTICAL_ALIGNMENT_TOP;
        parent.addControl(panel);
        
        const header = new TextBlock();
        this.header = header;
        header.paddingLeft = '10px';
        header.text = this.worldProvider.world.engine.getFps().toFixed() + " fps";
        header.width = "180px";
        header.textHorizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
        header.color = "white";
        panel.addControl(header);
    }


}