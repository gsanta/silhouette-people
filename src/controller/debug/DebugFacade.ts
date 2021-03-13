import { World } from "../../model/World";
import { WorldAxisHelper } from "./WorldAxisHelper";


export class DebugFacade {
    private world: World;
    private worldAxisHelper: WorldAxisHelper;


    constructor(world: World) {
        this.world = world;
        this.worldAxisHelper = new WorldAxisHelper(world);
    }

    setWorldAxisVisibility(isVisible: boolean, yPos: number = 1) {
        isVisible ? this.worldAxisHelper.show(yPos) : this.worldAxisHelper.hide();
    }

    setEnemyPathVisibility(isVisible: boolean) {
        
    }
}