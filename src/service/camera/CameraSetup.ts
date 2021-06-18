import { StaticCameraInputController } from "../../model/objects/camera/StaticCameraInputController";
import { StaticCameraPosController } from "../../model/objects/camera/StaticCameraPosController";
import { GameObjectStore } from "../../store/GameObjectStore";
import { QuarterStore } from "../../store/QuarterStore";
import { ActivePlayerService } from "../ActivePlayerService";
import { KeyboardService } from "../base/keyboard/KeyboardService";
import { PlayerStore } from "../player/PlayerStore";
import { WorldProvider } from "../WorldProvider";
import { CameraFactory } from "./CameraFactory";
import { CameraService } from "./CameraService";

export class CameraSetup {
    private readonly cameraFactory: CameraFactory;
    private readonly worldProvider: WorldProvider;
    private readonly quarterStore: QuarterStore;
    private readonly keyboardService: KeyboardService;
    private readonly cameraService: CameraService;
    private readonly playerStore: PlayerStore;

    constructor(
        worldProvider: WorldProvider,
        quarterStore: QuarterStore,
        keyboardService: KeyboardService,
        cameraService: CameraService,
        playerStore: PlayerStore
    ) {
        this.worldProvider = worldProvider;
        this.quarterStore = quarterStore;
        this.keyboardService = keyboardService;
        this.cameraService = cameraService;
        this.playerStore = playerStore;
        this.cameraFactory = new CameraFactory(worldProvider);
    }

    setup() {
        const staticCamera = this.cameraFactory.createStaticCamera()
        const staticCameraPosController = new StaticCameraPosController(this.worldProvider.world, staticCamera, this.quarterStore);1
        staticCamera.addBehaviour(staticCameraPosController);

        const staticCameraInputController = new StaticCameraInputController(staticCameraPosController, this.keyboardService);
        staticCamera.inputController = staticCameraInputController;

        // this.cameraService.addCamera(staticCamera, true);

        const followCamera = this.cameraFactory.createFollowCamera();
        followCamera.getCamera().lockedTarget = this.playerStore.getActivePlayer().mesh;

        this.cameraService.addCamera(followCamera, true);

    }
}