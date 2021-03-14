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

    setEnemyPathVisibility(isVisible: boolean) {
        this.enemyPathDebugger.show();
    }
}