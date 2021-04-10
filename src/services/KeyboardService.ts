import { KeyChecker } from "./KeyChecker";
import { InjectProperty } from "../di/diDecorators";
import { ControllerService } from "./ControllerService";
import { WorldProvider } from "../stores/WorldProvider";
import { lookup } from "./Lookup";

export class KeyboardService {
    activeKeys: Set<string> = new Set();
    checker: KeyChecker;

    @InjectProperty("ControllerService")
    private controllerService: ControllerService;

    @InjectProperty("WorldProvider")
    private worldProvider: WorldProvider;

    constructor() {
        this.checker = new KeyChecker(this);
        this.controllerService = lookup.controller;
        this.worldProvider = lookup.worldProvider;
    }

    keyDown(e: KeyboardEvent) {
        this.activeKeys.add(e.key);

        this.controllerService.all.forEach(controller => controller.keyboard(e));
        this.worldProvider.world.obj.getAll().forEach(obj => obj.state.keyboard(e, true));
    }

    keyUp(e: KeyboardEvent) {
        this.activeKeys.delete(e.key);
        this.worldProvider.world.obj.getAll().forEach(obj => obj.state.currState && obj.state.currState.keyboard(e, false)); 
    }
}