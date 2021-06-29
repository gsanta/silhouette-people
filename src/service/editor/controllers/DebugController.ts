import { AdvancedDynamicTexture } from "babylonjs-gui";
import { GameObjectStore } from "../../../store/GameObjectStore";
import { IGUIComponent } from "../../debug/IGUIComponent";
import { QuarterMapDebugger } from "../../debug/QuarterMapDebugger";
import { WorldAxisHelper } from "../../debug/WorldAxisHelper";
import { RenderGuiService } from "../../RenderGuiService";

export class DebugController {
    private worldAxisHelper: WorldAxisHelper;
    private texture: AdvancedDynamicTexture;
    areaMapDebugger: QuarterMapDebugger;
    
    private readonly meshStore: GameObjectStore;
    private readonly renderGuiService: RenderGuiService;
    private _boundingBoxVisibility = false;

    private guiComponents: IGUIComponent[] = [];

    constructor(meshStore: GameObjectStore, renderGuiService: RenderGuiService) {
        this.meshStore = meshStore;
        this.renderGuiService = renderGuiService;
        this.worldAxisHelper = new WorldAxisHelper();
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

    setColliderMeshVisibility(isVisible: boolean) {
        this.meshStore.getAll().forEach(meshObj =>  meshObj.collisionMesh && (meshObj.collisionMesh.showBoundingBox = isVisible));
    }

    set boundingBoxVisibility(isVisible: boolean) {
        this._boundingBoxVisibility = isVisible;
        this.meshStore.getAll().forEach(meshObj =>  meshObj.collisionMesh && (meshObj.collisionMesh.showBoundingBox = isVisible));
        this.renderGuiService.render();
    }

    get boundingBoxVisibility() {
        return this._boundingBoxVisibility;
    }

    updateBoundingBoxVisibility() {
        this.boundingBoxVisibility = this.boundingBoxVisibility;
    }
}