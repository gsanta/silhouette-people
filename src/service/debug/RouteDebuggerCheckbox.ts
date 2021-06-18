import { Checkbox, Container, Control, StackPanel, TextBlock } from "babylonjs-gui";
import { InjectProperty } from "../../di/diDecorators";
import { lookup } from "../DependencyResolver";
import { DebugService } from "./DebugService";
import { IGUIComponent } from "./IGUIComponent";

export class RouteDebuggerCheckbox implements IGUIComponent {
    @InjectProperty("DebugService")
    private debugService: DebugService;

    constructor() {
        this.debugService = lookup.debugService;
    }

    render(parent: Container) {
        const panel = new StackPanel();
        panel.width = "300px";
        panel.height = '30px';
        panel.isVertical = false;
        panel.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
        panel.verticalAlignment = Control.VERTICAL_ALIGNMENT_TOP;
        parent.addControl(panel);

        const checkbox = new Checkbox();
        checkbox.width = "20px";
        checkbox.height = "20px";
        checkbox.isChecked = false;
        checkbox.color = "green";
        checkbox.onIsCheckedChangedObservable.add((value) => {
            this.debugService.setRouteDebuggerVisibility(value);
        });
        panel.addControl(checkbox);
        
        const header = new TextBlock();
        header.paddingLeft = '10px';
        header.text = "Show citizen routes";
        header.width = "180px";
        header.textHorizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
        header.color = "white";
        panel.addControl(header);
    }
}