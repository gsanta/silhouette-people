import { Lookup } from "./Lookup";
import { QuarterMapDebugger } from "../debug/QuarterMapDebugger";
import { RouteDebugger } from "../debug/RouteDebugger";
import { WorldAxisHelper } from "../debug/WorldAxisHelper";

export class DebugService {
    private world: Lookup;
    private worldAxisHelper: WorldAxisHelper;
    private enemyPathDebugger: RouteDebugger;
    areaMapDebugger: QuarterMapDebugger;

    constructor(world: Lookup) {
        this.world = world;
        this.worldAxisHelper = new WorldAxisHelper(world);
        this.enemyPathDebugger = new RouteDebugger(world);
        this.areaMapDebugger = new QuarterMapDebugger(world);
    }

    setWorldAxisVisibility(isVisible: boolean, yPos: number = 1) {
        isVisible ? this.worldAxisHelper.show(yPos) : this.worldAxisHelper.hide();
    }

    setRouteDebuggerVisibility(isVisible: boolean) {
        if (isVisible) {
            this.world.debug.areaMapDebugger.show();
            this.enemyPathDebugger.show();
        } else {
            this.world.debug.areaMapDebugger.hide();
        }
    }

    setColliderMeshVisibility(isVisible: boolean) {
        this.world.activeObj.getAllGameObjects().forEach(go => go.setColliderVisibility(isVisible));
    }

    setMeshBoundingBoxVisibility(isVisible: boolean) {
        this.world.activeObj.getAllGameObjects().forEach(go => go.setBoundingBoxVisibility(isVisible));
    }
}