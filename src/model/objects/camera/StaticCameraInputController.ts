import { KeyboardService, KeyName } from "../../../service/input/KeyboardService";
import { InputController } from "../game_object/InputController";
import { StaticCameraPosController } from "./StaticCameraPosController";

export class StaticCameraInputController extends InputController {
    private staticCameraPosController: StaticCameraPosController;

    constructor(staticCameraPosController: StaticCameraPosController, keyboardService: KeyboardService) {
        super(keyboardService);
        this.staticCameraPosController = staticCameraPosController;
    }

    keyboard(downKeys: Set<string>) {
        if (downKeys.has(KeyName.SPACE)) {
            this.staticCameraPosController.increaseCornerIndex();
        }
    }
}