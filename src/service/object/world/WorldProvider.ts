import { LightObj } from "../../../model/object/LightObj";
import { WorldObj } from "../../../model/object/WorldObj";

export class WorldProvider {
    private worldObj: WorldObj;

    get world(): WorldObj {
        return this.worldObj;
    }

    set world(worldObj: WorldObj) {
        this.worldObj = worldObj;
    }
}