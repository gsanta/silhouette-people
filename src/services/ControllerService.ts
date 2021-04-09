import { CameraController } from "../controllers/CameraController";
import { AbstractController } from "../controllers/IController";
import { PlayerController } from "../controllers/PlayerController";
import { Lookup } from "./Lookup";


export class ControllerService {
    readonly all: AbstractController[] = [];

    readonly player: PlayerController;
    readonly camera: CameraController;

    constructor(world: Lookup) {
        this.player = new PlayerController(world);
        this.camera = new CameraController(world);

        this.all.push(this.player, this.camera);
    }
}