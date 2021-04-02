import { CameraController } from "../controllers/CameraController";
import { DistrictController } from "../controllers/DistrictController";
import { AbstractController } from "../controllers/IController";
import { PlayerController } from "../controllers/PlayerController";
import { World } from "./World";


export class ControllerService {
    readonly all: AbstractController[] = [];

    readonly player: PlayerController;
    readonly camera: CameraController;
    readonly district: DistrictController;

    constructor(world: World) {
        this.player = new PlayerController(world);
        this.camera = new CameraController(world);
        this.district = new DistrictController(world);

        this.all.push(this.player, this.camera, this.district);
    }

    update() {
        this.all.forEach(controller => controller.update());
    }
}