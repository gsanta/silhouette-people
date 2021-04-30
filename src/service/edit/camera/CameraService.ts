import { InjectProperty } from "../../../di/diDecorators";
import { CameraObj } from "../../../model/object/CameraObj";
import { KeyboardListener, KeyboardService } from "../../base/keyboard/KeyboardService";
import { lookup } from "../../Lookup";

export class CameraService implements KeyboardListener {
    private cameraObj: CameraObj;

    @InjectProperty("KeyboardService")
    private keyboardService: KeyboardService;

    constructor() {
        this.keyboardService = lookup.keyboard;

        this.keyboardService.addListener(this);
    }

    setCameraObj(cameraObj: CameraObj) {
        this.cameraObj = cameraObj;
    }

    onKeyDown(e: KeyboardEvent): void {
        switch(e.key) {
            case 'c':
                if (this.cameraObj) {
                    this.cameraObj.increaseCornerIndex();
                }
            break;
        }
    }

    onKeyUp(e: KeyboardEvent): void {}
}