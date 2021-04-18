import { CameraController } from "../controllers/CameraController";
import { AbstractController } from "../controllers/IController";
import { PointerData } from "./input/PointerService";

export class ControllerService extends AbstractController {
    private cameraController: CameraController;
    private masterController: AbstractController;

    setCameraController(controller: CameraController) {
        this.cameraController = controller;
    }

    getCameraController() {
        return this.cameraController;
    }

    setMasterController(controller: AbstractController) {
        this.masterController = controller;
    }

    setup() {
        this.masterController.setup();
    }

    keyboard(e: KeyboardEvent, isKeyDown: boolean) {
        this.masterController.keyboard(e, isKeyDown);
    }

    pointerDown(pointer: PointerData) {
        this.masterController.pointerDown(pointer);
    }

    pointerMove(pointer: PointerData) {
        this.masterController.pointerMove(pointer);
    }

    beforeRender() {
        this.masterController.beforeRender();
    }
}