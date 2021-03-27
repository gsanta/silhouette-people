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
        this.world.store.getAllGameObjects().forEach(obj => obj.states.keyboard(e, true));
    }

    keyUp(e: KeyboardEvent) {
        this.activeKeys.delete(e.key);
        this.world.store.getAllGameObjects().forEach(obj => obj.states.currState && obj.states.currState.keyboard(e, false)); 
    }
}