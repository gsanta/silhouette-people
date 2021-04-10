import { Lookup } from "./Lookup";
import { QuarterMapDebugger } from "../debug/QuarterMapDebugger";
import { RouteDebugger } from "../debug/RouteDebugger";
import { WorldAxisHelper } from "../debug/WorldAxisHelper";
import { DebugPanel } from "./debug/DebugPanel";
import { RouteDebuggerCheckbox } from "./debug/RouteDebuggerCheckbox";
import { ColliderCheckbox } from "./debug/ColliderCheckbox";
import { WorldAxisCheckbox } from "./debug/WorldAxisCheckbox";
import { MeshBoundingBoxCheckbox } from "./debug/MeshBoundingBoxCheckbox";
import { AdvancedDynamicTexture } from "babylonjs-gui";
import { PlayerRadioButtonGroup } from "./debug/PlayerRadioButtonGroup";

export class DebugService {
    private lookup: Lookup;
    private worldAxisHelper: WorldAxisHelper;
    private enemyPathDebugger: RouteDebugger;
    private texture: AdvancedDynamicTexture;
    areaMapDebugger: QuarterMapDebugger;

    private debugPanel: DebugPanel;

    constructor(lookup: Lookup) {
        this.lookup = lookup;
        this.worldAxisHelper = new WorldAxisHelper(lookup);
        this.enemyPathDebugger = new RouteDebugger(lookup);
        this.areaMapDebugger = new QuarterMapDebugger(lookup);

        this.debugPanel = new DebugPanel();
        this.debugPanel.addChild(new RouteDebuggerCheckbox());
        this.debugPanel.addChild(new ColliderCheckbox());
        this.debugPanel.addChild(new WorldAxisCheckbox());
        this.debugPanel.addChild(new MeshBoundingBoxCheckbox());
        this.debugPanel.addChild(new PlayerRadioButtonGroup());
    }

    renderDebugPanel() {
        if (!this.texture) {
            this.texture = AdvancedDynamicTexture.CreateFullscreenUI("UI");
        }
        this.debugPanel.render(this.texture, this.lookup);
    }

    setWorldAxisVisibility(isVisible: boolean, yPos: number = 1) {
        isVisible ? this.worldAxisHelper.show(yPos) : this.worldAxisHelper.hide();
    }

    setRouteDebuggerVisibility(isVisible: boolean) {
        if (isVisible) {
            this.lookup.debug.areaMapDebugger.show();
            this.enemyPathDebugger.show();
        } else {
            this.lookup.debug.areaMapDebugger.hide();
        }
    }

    setColliderMeshVisibility(isVisible: boolean) {
        this.lookup.activeObj.getAllGameObjects().forEach(go => go.setColliderVisibility(isVisible));
    }

    setMeshBoundingBoxVisibility(isVisible: boolean) {
        this.lookup.activeObj.getAllGameObjects().forEach(go => go.setBoundingBoxVisibility(isVisible));
    }
}