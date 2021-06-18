import { StaticCameraInputController } from "../../model/objects/camera/StaticCameraInputController";
import { StaticCameraPosController } from "../../model/objects/camera/StaticCameraPosController";
import { QuarterStore } from "../../store/QuarterStore";
import { KeyboardService } from "../base/keyboard/KeyboardService";
import { WorldProvider } from "../WorldProvider";
import { CameraFactory } from "./CameraFactory";
import { CameraService } from "./CameraService";

export class CameraSetup {
    private readonly cameraFactory: CameraFactory;
    private readonly worldProvider: WorldProvider;
    private readonly quarterStore: QuarterStore;
    private readonly keyboardService: KeyboardService;
    private readonly cameraService: CameraService;

    constructor(worldProvider: WorldProvider, quarterStore: QuarterStore, keyboardService: KeyboardService, cameraService: CameraService) {
        this.worldProvider = worldProvider;
        this.quarterStore = quarterStore;
        this.keyboardService = keyboardService;
        this.cameraService = cameraService;
        this.cameraFactory = new CameraFactory(worldProvider);
    }

    setup() {
        const staticCamera = this.cameraFactory.createStaticCamera()
        const staticCameraPosController = new StaticCameraPosController(this.worldProvider.world, staticCamera, this.quarterStore);1
        staticCamera.addBehaviour(staticCameraPosController);

        const staticCameraInputController = new StaticCameraInputController(staticCameraPosController, this.keyboardService);
        staticCamera.inputController = staticCameraInputController;

        this.cameraService.addCamera(staticCamera, true);
    }
}