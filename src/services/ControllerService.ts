import { CameraController } from "../controllers/CameraController";
import { AbstractController } from "../controllers/IController";
import { PlayerController } from "../controllers/PlayerController";
import { World } from "./World";


export class ControllerService {
    readonly all: AbstractController[] = [];

    readonly player: PlayerController;
    readonly camera: CameraController;

    constructor(world: World) {
        this.player = new PlayerController(world);
        this.camera = new CameraController(world);

        this.all.push(this.player, this.camera);
    }
}