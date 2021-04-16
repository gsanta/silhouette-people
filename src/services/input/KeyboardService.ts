import { KeyChecker } from "./KeyChecker";
import { InjectProperty } from "../../di/diDecorators";
import { ControllerService } from "../ControllerService";
import { WorldProvider } from "../WorldProvider";
import { lookup } from "../Lookup";
import { MeshStore } from "../../stores/MeshStore";

export class KeyboardService {
    activeKeys: Set<string> = new Set();
    checker: KeyChecker;

    @InjectProperty("ControllerService")
    private controllerService: ControllerService;

    @InjectProperty("WorldProvider")
    private worldProvider: WorldProvider;

    @InjectProperty("MeshStore")
    private meshStore: MeshStore;

    constructor() {
        this.checker = new KeyChecker(this);
        this.controllerService = lookup.controller;
        this.worldProvider = lookup.worldProvider;
        this.meshStore = lookup.meshStore;
    }

    keyDown(e: KeyboardEvent) {
        this.activeKeys.add(e.key);

        this.controllerService.keyboard(e, true);
    }

    keyUp(e: KeyboardEvent) {
        this.activeKeys.delete(e.key);
        this.controllerService.keyboard(e, false);
    }
}