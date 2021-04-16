import { CameraObj } from "../model/general/objs/CameraObj";
import { AbstractController, ControllerType } from "./IController";

// TODO merge with CameraObj
export class CameraController extends AbstractController {
    type = ControllerType.Camera;
    private cameraObj: CameraObj;

    setCameraObj(cameraObj: CameraObj) {
        this.cameraObj = cameraObj;
    }

    keyboard(e: KeyboardEvent) {
        switch(e.key) {
            case 'c':
                if (this.cameraObj) {
                    this.cameraObj.increaseCornerIndex();
                }
            break;
        }
    }
}