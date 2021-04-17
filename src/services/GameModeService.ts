import { InjectProperty } from "../di/diDecorators";
import { NormalModeController } from "../model/general/controller/NormalModeController";
import { TilingModeController } from "../model/general/controller/TilingModeController";
import { MeshStore } from "../stores/MeshStore";
import { QuarterStore } from "../stores/QuarterStore";
import { ActivePlayerService } from "./ActivePlayerService";
import { ControllerService } from "./ControllerService";
import { lookup } from "./Lookup";

export class GameModeService {

    @InjectProperty("QuarterStore")
    private quarterStore: QuarterStore;

    @InjectProperty("ControllerService")
    private controllerService: ControllerService;

    @InjectProperty("MeshStore")
    private meshStore: MeshStore;

    @InjectProperty("ActivePlayerService")
    private activePlayerService: ActivePlayerService;

    constructor() {
        this.quarterStore = lookup.quarterStore;
        this.controllerService = lookup.controller;
        this.meshStore = lookup.meshStore;
        this.activePlayerService = lookup.activePlayerService;
    }

    changeToTBM() {
        this.quarterStore.getAllQuarters()[5].tiles.activate();
        this.controllerService.setMasterController(new TilingModeController(this.controllerService.getCameraController()));
        const player2 = this.meshStore.getById('player2');
        player2.setVisibility(true);
        this.activePlayerService.activate(player2);
        const player1 = this.meshStore.getById('player1');
        player1.setVisibility(false);
    }

    changeToRTM() {
        this.quarterStore.getAllQuarters()[5].tiles.deactivate();
        this.controllerService.setMasterController(new NormalModeController(this.controllerService.getCameraController()));
        const player1 = this.meshStore.getById('player1');
        player1.setVisibility(true);
        this.activePlayerService.activate(player1);
        const player2 = this.meshStore.getById('player2');
        player2.setVisibility(false);
    }
}