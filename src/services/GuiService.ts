import { World } from "./World";
import { AdvancedDynamicTexture, StackPanel, Control, Checkbox, TextBlock } from 'babylonjs-gui';

export class GuiService {
    private world: World;
    private texture: AdvancedDynamicTexture;

    constructor(world: World) {
        this.world = world;
    
        this.world.onReady(() => this.init());
    }

    private init() {
        this.texture = AdvancedDynamicTexture.CreateFullscreenUI("UI");

        var panel = new StackPanel();
        panel.width = "300px";
        panel.left = '20px';
        panel.top = '20px';
        panel.isVertical = true;
        panel.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
        panel.verticalAlignment = Control.VERTICAL_ALIGNMENT_TOP;
        this.texture.addControl(panel);

        this.createRouteDebuggerRow(panel);
        this.createColliderMeshRow(panel);
        this.createWorldAxisRow(panel);
        this.createMeshBoundingBoxRow(panel);
    }

    private createRouteDebuggerRow(parentPanel: StackPanel) {
        var panel = new StackPanel();
        panel.width = "300px";
        panel.height = '30px';
        panel.isVertical = false;
        panel.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
        panel.verticalAlignment = Control.VERTICAL_ALIGNMENT_TOP;
        parentPanel.addControl(panel);

        var checkbox = new Checkbox();
        checkbox.width = "20px";
        checkbox.height = "20px";
        checkbox.isChecked = false;
        checkbox.color = "green";
        checkbox.onIsCheckedChangedObservable.add((value) => {
            this.world.debug.setRouteDebuggerVisibility(value);
        });
        panel.addControl(checkbox);
        
        var header = new TextBlock();
        header.paddingLeft = '10px';
        header.text = "debug routes";
        header.width = "180px";
        header.textHorizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
        header.color = "white";
        panel.addControl(header);
    }

    private createColliderMeshRow(parentPanel: StackPanel) {
        var panel = new StackPanel();
        panel.width = "300px";
        panel.height = '30px';
        panel.isVertical = false;
        panel.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
        panel.verticalAlignment = Control.VERTICAL_ALIGNMENT_TOP;
        parentPanel.addControl(panel);

        var checkbox = new Checkbox();
        checkbox.width = "20px";
        checkbox.height = "20px";
        checkbox.isChecked = false;
        checkbox.color = "green";
        checkbox.onIsCheckedChangedObservable.add((value) => {
            this.world.debug.setColliderMeshVisibility(value)
        });
        panel.addControl(checkbox);
        
        var header = new TextBlock();
        header.paddingLeft = '10px';
        header.text = "show colliders";
        header.width = "180px";
        header.textHorizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
        header.color = "white";
        panel.addControl(header);
    }

    private createMeshBoundingBoxRow(parentPanel: StackPanel) {
        var panel = new StackPanel();
        panel.width = "300px";
        panel.height = '30px';
        panel.isVertical = false;
        panel.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
        panel.verticalAlignment = Control.VERTICAL_ALIGNMENT_TOP;
        parentPanel.addControl(panel);

        var checkbox = new Checkbox();
        checkbox.width = "20px";
        checkbox.height = "20px";
        checkbox.isChecked = false;
        checkbox.color = "green";
        checkbox.onIsCheckedChangedObservable.add((value) => {
            this.world.debug.setMeshBoundingBoxVisibility(value)
        });
        panel.addControl(checkbox);
        
        var header = new TextBlock();
        header.paddingLeft = '10px';
        header.text = "show mesh boxes";
        header.width = "180px";
        header.textHorizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
        header.color = "white";
        panel.addControl(header);
    }

    private createWorldAxisRow(parentPanel: StackPanel) {
        var panel = new StackPanel();
        panel.width = "300px";
        panel.height = '30px';
        panel.isVertical = false;
        panel.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
        panel.verticalAlignment = Control.VERTICAL_ALIGNMENT_TOP;
        parentPanel.addControl(panel);

        var checkbox = new Checkbox();
        checkbox.width = "20px";
        checkbox.height = "20px";
        checkbox.isChecked = false;
        checkbox.color = "green";
        checkbox.onIsCheckedChangedObservable.add((value) => {
            this.world.debug.setWorldAxisVisibility(value)
        });
        panel.addControl(checkbox);
        
        var header = new TextBlock();
        header.paddingLeft = '10px';
        header.text = "show world axis";
        header.width = "180px";
        header.textHorizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
        header.color = "white";
        panel.addControl(header);
    }
}