import { CameraObj } from "../model/objs/CameraObj";

export class GlobalStore {
    private cameraObj: CameraObj;

    setCamera(cameraObj: CameraObj) {
        this.cameraObj = cameraObj;
    }

    getCamera(): CameraObj {
        return this.cameraObj;
    }
}