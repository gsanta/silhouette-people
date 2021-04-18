import { BikeController } from "../../../controllers/BikeController";
import { CameraController } from "../../../controllers/CameraController";
import { EnemyController } from "../../../controllers/EnemyController";
import { AbstractController } from "../../../controllers/IController";
import { PlayerController } from "../../../controllers/PlayerController";
import { RouteController } from "../../../controllers/RouteController";
import { PointerData } from "../../../services/input/PointerService";

export class NormalModeController extends AbstractController {

    private delegates: AbstractController[] = [];

    constructor(cameraController: CameraController) {
        super();
        this.delegates = [
            new PlayerController(),
            new EnemyController(),
            new BikeController(),
            new RouteController(),
            cameraController
        ];
    }

    setup() {
        this.delegates.forEach(delegate => delegate.setup());
    }

    keyboard(e: KeyboardEvent, isKeyDown: boolean) {
        this.delegates.forEach(delegate => delegate.keyboard(e, isKeyDown));
    }

    pointerDown(pointer: PointerData) {
        this.delegates.forEach(delegate => delegate.pointerDown(pointer));
    }

    pointerMove(pointer: PointerData) {
        this.delegates.forEach(delegate => delegate.pointerMove(pointer));
    }

    beforeRender() {
        this.delegates.forEach(delegate => delegate.beforeRender());
    }
}