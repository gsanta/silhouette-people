import { GameObjectStore } from "../store/GameObjectStore";
import { QuarterStore } from "../store/QuarterStore";
import { CameraService } from "./camera/CameraService";
import { KeyboardService } from "./input/KeyboardService";
import { QuarterUpdater } from "./object/QuarterUpdater";
import { PlayerStore } from "./player/PlayerStore";
import { SceneService } from "./SceneService";

export class UpdateService {

    private readonly worldProvider: SceneService;
    private readonly meshStore: GameObjectStore;
    private readonly keyboardService: KeyboardService;
    private readonly cameraService: CameraService;

    private quarterUpdater: QuarterUpdater;

    constructor(
        worldProvider: SceneService,
        gameObjectStore: GameObjectStore,
        playerStore: PlayerStore,
        quarterStore: QuarterStore,
        keyboardService: KeyboardService,
        cameraService: CameraService
    ) {
        this.cameraService = cameraService;
        this.worldProvider = worldProvider;
        this.meshStore = gameObjectStore;
        this.keyboardService = keyboardService;

        this.quarterUpdater = new QuarterUpdater(this.worldProvider, playerStore, quarterStore);
    }

    update() {
        this.quarterUpdater.updateActiveQuarter();

        const deltaTime = this.worldProvider.world.engine.getDeltaTime();
        this.meshStore.getAll().forEach(gameObject => gameObject.update(deltaTime));
        
        if (this.cameraService.hasActiveCamera()) {
            this.cameraService.getActiveCamera().update(deltaTime);
        }
    }
}