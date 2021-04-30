import { AdvancedDynamicTexture } from "babylonjs-gui";
import { QuarterMapDebugger } from "./QuarterMapDebugger";
import { RouteDebugger } from "./RouteDebugger";
import { WorldAxisHelper } from "./WorldAxisHelper";
import { InjectProperty } from "../../../di/diDecorators";
import { MeshStore } from "../../../stores/MeshStore";
import { WorldProvider } from "../../object/world/WorldProvider";
import { IGUIComponent } from "./IGUIComponent";
import { lookup } from "../../Lookup";

export class DebugService {
    private worldAxisHelper: WorldAxisHelper;
    private enemyPathDebugger: RouteDebugger;
    private texture: AdvancedDynamicTexture;
    areaMapDebugger: QuarterMapDebugger;
    
    @InjectProperty("MeshStore")
    private meshStore: MeshStore;

    private guiComponents: IGUIComponent[] = [];

    constructor() {
        this.meshStore = lookup.meshStore;
        this.worldAxisHelper = new WorldAxisHelper();
        this.enemyPathDebugger = new RouteDebugger(this);
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
        this.meshStore.getAll().forEach(meshObj => meshObj.instance.getMesh().showBoundingBox = isVisible);
    }

    setMeshBoundingBoxVisibility(isVisible: boolean) {
        this.meshStore.getAll().forEach(meshObj => meshObj.instance.getMesh().showBoundingBox = isVisible);
    }
}