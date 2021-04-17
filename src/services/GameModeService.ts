import { InjectProperty } from "../di/diDecorators";
import { NormalModeController } from "../model/general/controller/NormalModeController";
import { TilingModeController } from "../model/general/controller/TilingModeController";
import { MeshStore } from "../stores/MeshStore";
import { QuarterStore } from "../stores/QuarterStore";
import { TileStore } from "../stores/TileStore";
import { ActivePlayerService } from "./ActivePlayerService";
import { ControllerService } from "./ControllerService";
import { TileFactory } from "./factory/TileFactory";
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

    @InjectProperty("TileFactory")
    private tileFactory: TileFactory;

    @InjectProperty("TileStore")
    private tileStore: TileStore;

    constructor() {
        this.quarterStore = lookup.quarterStore;
        this.controllerService = lookup.controller;
        this.meshStore = lookup.meshStore;
        this.activePlayerService = lookup.activePlayerService;
        this.tileStore = lookup.tileStore;
        this.tileFactory = lookup.tileFactory;
    }

    changeToTBM() {
        const bounds = this.quarterStore.getAllQuarters()[5].getBounds2D();
        this.tileFactory.createTilesForArea(bounds);

        this.controllerService.setMasterController(new TilingModeController(this.controllerService.getCameraController()));
        const player2 = this.meshStore.getById('player2');
        player2.setVisibility(true);
        this.activePlayerService.activate(player2);
        const player1 = this.meshStore.getById('player1');
        player1.setVisibility(false);
    }

    changeToRTM() {
        this.tileStore.clearTiles();
        this.controllerService.setMasterController(new NormalModeController(this.controllerService.getCameraController()));
        const player1 = this.meshStore.getById('player1');
        player1.setVisibility(true);
        this.activePlayerService.activate(player1);
        const player2 = this.meshStore.getById('player2');
        player2.setVisibility(false);
    }
}