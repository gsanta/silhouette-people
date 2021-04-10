import { CameraObj } from "../model/objs/CameraObj";
import { AbstractController } from "./IController";

// TODO merge with CameraObj
export class CameraController extends AbstractController {
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