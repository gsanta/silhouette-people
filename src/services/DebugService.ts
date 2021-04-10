import { AdvancedDynamicTexture } from "babylonjs-gui";
import { QuarterMapDebugger } from "../debug/QuarterMapDebugger";
import { RouteDebugger } from "../debug/RouteDebugger";
import { WorldAxisHelper } from "../debug/WorldAxisHelper";
import { InjectProperty } from "../di/diDecorators";
import { WorldProvider } from "../stores/WorldProvider";
import { IGUIComponent } from "./debug/IGUIComponent";
import { lookup } from "./Lookup";

export class DebugService {
    private worldAxisHelper: WorldAxisHelper;
    private enemyPathDebugger: RouteDebugger;
    private texture: AdvancedDynamicTexture;
    areaMapDebugger: QuarterMapDebugger;

    @InjectProperty("WorldProvider")
    private worldProvider: WorldProvider;

    private guiComponents: IGUIComponent[] = [];

    constructor() {
        this.worldProvider = lookup.worldProvider;
        this.worldAxisHelper = new WorldAxisHelper();
        this.enemyPathDebugger = new RouteDebugger();
        this.areaMapDebugger = new QuarterMapDebugger();
    }

    addGuiComponent(component: IGUIComponent) {
        this.guiComponents.push(component);
    }

    render() {
        if (!this.texture) {
            this.texture = AdvancedDynamicTexture.CreateFullscreenUI("UI");
        }
        this.guiComponents.forEach(comp => comp.render(this.texture));
    }

    setWorldAxisVisibility(isVisible: boolean, yPos: number = 1) {
        isVisible ? this.worldAxisHelper.show(yPos) : this.worldAxisHelper.hide();
    }

    setRouteDebuggerVisibility(isVisible: boolean) {
        if (isVisible) {
            this.areaMapDebugger.show();
            this.enemyPathDebugger.show();
        } else {
            this.areaMapDebugger.hide();
        }
    }

    setColliderMeshVisibility(isVisible: boolean) {
        this.worldProvider.world.obj.getAll().forEach(go => go.setColliderVisibility(isVisible));
    }

    setMeshBoundingBoxVisibility(isVisible: boolean) {
        this.worldProvider.world.obj.getAll().forEach(go => go.setBoundingBoxVisibility(isVisible));
    }
}