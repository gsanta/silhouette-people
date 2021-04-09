import { Lookup } from "../services/Lookup";
import { AbstractController } from "./IController";

export class CameraController extends AbstractController {
    private world: Lookup;

    constructor(world: Lookup) {
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