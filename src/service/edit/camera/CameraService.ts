import { InjectProperty } from "../../../di/diDecorators";
import { CameraItem } from "../../../model/item/CameraItem";
import { KeyboardListener, KeyboardService } from "../../base/keyboard/KeyboardService";
import { lookup } from "../../Lookup";

export class CameraService implements KeyboardListener {
    private cameraObj: CameraItem;

    @InjectProperty("KeyboardService")
    private keyboardService: KeyboardService;

    constructor() {
        this.keyboardService = lookup.keyboard;

        this.keyboardService.addListener(this);
    }

    setCameraObj(cameraObj: CameraItem) {
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