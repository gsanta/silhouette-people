import { World } from "../services/World";
import { AbstractController } from "./IController";

export class CameraController extends AbstractController {
    private world: World;

    constructor(world: World) {
        super();
        this.world = world;
    }

    keyboard(e: KeyboardEvent) {
        switch(e.key) {
            case 'c':
                const camera = this.world.globalStore.getCamera();
                camera.increaseCornerIndex();
            break;
        }
    }
}