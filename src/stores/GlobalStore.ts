import { CameraObj } from "../model/objs/CameraObj";
import { LightObj } from "../model/objs/LightObj";

export class GlobalStore {
    private cameraObj: CameraObj;
    private lightObj: LightObj;

    setCamera(cameraObj: CameraObj) {
        this.cameraObj = cameraObj;
    }

    getCamera(): CameraObj {
        return this.cameraObj;
    }

    setHighlight(lightObj: LightObj) {
        this.lightObj = lightObj;
    }

    getHighlight(): LightObj {
        return this.lightObj;
    }
}