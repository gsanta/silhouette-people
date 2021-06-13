import { InjectProperty } from "../../../di/diDecorators";
import { CameraObject } from "../../../model/objects/camera/CameraObject";
import { KeyboardListener, KeyboardService } from "../../base/keyboard/KeyboardService";
import { lookup } from "../../Lookup";

export class CameraService implements KeyboardListener {
    private cameraObj: CameraObject;

    @InjectProperty("KeyboardService")
    private keyboardService: KeyboardService;

    constructor() {
        this.keyboardService = lookup.keyboard;

        this.keyboardService.addListener(this);
    }

    setCameraObj(cameraObj: CameraObject) {
        this.cameraObj = cameraObj;
    }

    onKeyDown(e: KeyboardEvent): void {
        switch(e.key) {
            case ' ':
                if (this.cameraObj) {
                    this.cameraObj.increaseCornerIndex();
                }
            break;
        }
    }

    onKeyUp(e: KeyboardEvent): void {}
}