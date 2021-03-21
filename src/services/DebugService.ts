import { World } from "../model/World";
import { QuarterMapDebugger } from "../core/debug/QuarterMapDebugger";
import { RouteDebugger } from "../core/debug/RouteDebugger";
import { WorldAxisHelper } from "../core/debug/WorldAxisHelper";

export class DebugService {
    private world: World;
    private worldAxisHelper: WorldAxisHelper;
    private enemyPathDebugger: RouteDebugger;
    areaMapDebugger: QuarterMapDebugger;

    constructor(world: World) {
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
        this.world.store.getAllGameObjects().forEach(go => go.setColliderVisibility(isVisible));
    }

    setMeshBoundingBoxVisibility(isVisible: boolean) {
        this.world.store.getAllGameObjects().forEach(go => go.setBoundingBoxVisibility(isVisible));
    }
}