import { LightObj } from "../model/objs/LightObj";
import { WorldObj } from "../model/objs/WorldObj";

export class WorldProvider {
    private worldObj: WorldObj;

    get world(): WorldObj {
        return this.worldObj;
    }

    set world(worldObj: WorldObj) {
        this.worldObj = worldObj;
    }
}