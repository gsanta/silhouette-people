import { World } from "../../model/World";
import { AreaMapDebugger, AreaVisualizerConfig } from "../ai/AreaMapDebugger";
import { EnemyPathDebugger } from "./EnemyPathDebugger";
import { WorldAxisHelper } from "./WorldAxisHelper";


export class DebugFacade {
    private world: World;
    private worldAxisHelper: WorldAxisHelper;
    private enemyPathDebugger: EnemyPathDebugger;
    areaMapDebugger: AreaMapDebugger;

    constructor(world: World) {
        this.world = world;
        this.worldAxisHelper = new WorldAxisHelper(world);
        this.enemyPathDebugger = new EnemyPathDebugger(world);
        this.areaMapDebugger = new AreaMapDebugger(world);
    }

    setWorldAxisVisibility(isVisible: boolean, yPos: number = 1) {
        isVisible ? this.worldAxisHelper.show(yPos) : this.worldAxisHelper.hide();
    }

    setEnemyPathVisibility(isVisible: boolean) {
        this.enemyPathDebugger.show();
    }
}