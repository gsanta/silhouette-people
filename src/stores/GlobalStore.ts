import { CameraObj } from "../model/objs/CameraObj";
import { LightObj } from "../model/objs/LightObj";
import { WorldObj } from "../model/objs/WorldObj";

export class GlobalStore {
    private lightObj: LightObj;
    private worldObj: WorldObj;

    setHighlight(lightObj: LightObj) {
        this.lightObj = lightObj;
    }

    getHighlight(): LightObj {
        return this.lightObj;
    }

    setWorld(worldObj: WorldObj) {
        this.worldObj = worldObj;
    }

    getWorld(): WorldObj {
        return this.worldObj;
    }
}