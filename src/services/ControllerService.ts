import { AbstractController } from "../controllers/IController";
import { PlayerController } from "../controllers/PlayerController";
import { World } from "./World";


export class ControllerService {
    readonly all: AbstractController[] = [];

    readonly player: PlayerController;

    constructor(world: World) {
        this.player = new PlayerController(world);
    
        this.all.push(this.player);
    }
}