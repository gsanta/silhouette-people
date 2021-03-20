import { World } from "../../model/World";
import { AreaMapDebugger } from "./AreaMapDebugger";
import { RouteDebugger } from "./RouteDebugger";
import { WorldAxisHelper } from "./WorldAxisHelper";

export class DebugService {
    private world: World;
    private worldAxisHelper: WorldAxisHelper;
    private enemyPathDebugger: RouteDebugger;
    areaMapDebugger: AreaMapDebugger;

    constructor(world: World) {
        this.world = world;
        this.worldAxisHelper = new WorldAxisHelper(world);
        this.enemyPathDebugger = new RouteDebugger(world);
        this.areaMapDebugger = new AreaMapDebugger(world);
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
        this.world.store.getActiveDistrict().getAllGameObjects().forEach(go => go.setColliderVisibility(isVisible));
    }

    setMeshBoundingBoxVisibility(isVisible: boolean) {
        this.world.store.getActiveDistrict().getAllGameObjects().forEach(go => go.setBoundingBoxVisibility(isVisible));
    }
}