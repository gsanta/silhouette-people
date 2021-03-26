import { World } from "./World";
import { KeyChecker } from "./KeyChecker";

export class KeyboardService {
    activeKeys: Set<string> = new Set();
    checker: KeyChecker;

    private readonly world: World;

    constructor(world: World) {
        this.world = world;
        this.checker = new KeyChecker(this);
    }

    keyDown(e: KeyboardEvent) {
        this.activeKeys.add(e.key);

        this.world.controller.all.forEach(controller => controller.keyboard(e));
    }

    keyUp(e: KeyboardEvent) {
        this.activeKeys.delete(e.key);
    }
}