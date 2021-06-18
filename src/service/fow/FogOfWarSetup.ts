import { CameraService } from "../edit/camera/CameraService";
import { PlayerStore } from "../player/PlayerStore";
import { WorldProvider } from "../WorldProvider";
import { FogOfWar, FogOfWarConfig } from "./FogOfWar";

export class FogOfWarSetup {

    private readonly worldProvider: WorldProvider;
    private readonly cameraService: CameraService;
    private readonly playerStore: PlayerStore;
    private fogOfWar: FogOfWar;

    constructor(worldProvider: WorldProvider, cameraService: CameraService, playerStore: PlayerStore) {
        this.worldProvider = worldProvider;
        this.cameraService = cameraService;
        this.playerStore = playerStore;
    }

    setup() {
        if (!this.fogOfWar) {
            const config: FogOfWarConfig = {
                width: 200,
                height: 200,
                positionY: 10
            }

            this.fogOfWar = new FogOfWar(this.worldProvider.scene, this.cameraService.getCamera().getCamera(), this.playerStore.getActivePlayer(), config);
            this.fogOfWar.update();
        }
    }

    update() {
        if (this.fogOfWar) {
            this.fogOfWar.update();
        }
    }
}