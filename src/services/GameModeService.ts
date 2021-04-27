import { InjectProperty } from "../di/diDecorators";
import { NormalModeController } from "../model/general/controller/NormalModeController";
import { TilingModeController } from "../model/general/controller/TilingModeController";
import { HumanoidObj } from "../model/general/objs/CharacterObj";
import { MeshStore } from "../stores/MeshStore";
import { QuarterStore } from "../stores/QuarterStore";
import { TileStore } from "../stores/TileStore";
import { ActivePlayerService } from "./ActivePlayerService";
import { ControllerService } from "./ControllerService";
import { TileFactory } from "./factory/TileFactory";
import { lookup } from "./Lookup";
import { RenderGuiService } from "./RenderGuiService";

export enum GameMode {
    REAL_TIME = 'REAL_TIME',
    TURN_BASED = 'TURN_BASED'
}

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

    @InjectProperty("RenderGuiService")
    private renderGuiService: RenderGuiService;

    gameMode: GameMode = GameMode.REAL_TIME;

    constructor() {
        this.quarterStore = lookup.quarterStore;
        this.controllerService = lookup.controller;
        this.meshStore = lookup.meshStore;
        this.activePlayerService = lookup.activePlayerService;
        this.tileStore = lookup.tileStore;
        this.tileFactory = lookup.tileFactory;
        this.renderGuiService = lookup.renderGui;
    }

    changeToTBSMode() {
        this.gameMode = GameMode.TURN_BASED;
        const bounds = this.quarterStore.getAllQuarters()[5].getBounds2D();
        this.tileFactory.createTilesForArea(bounds);

        this.controllerService.setMasterController(new TilingModeController(this.controllerService.getCameraController()));
        const player2 = <HumanoidObj> this.meshStore.getById('player2');
        player2.instance.setVisibility(true);
        this.activePlayerService.activate(player2);
        const player1 = this.meshStore.getById('player1');
        player1.instance.setVisibility(false);
        this.renderGuiService.render();
    }

    changeToRTSMode() {
        this.gameMode = GameMode.REAL_TIME;
        this.tileStore.clearTiles();
        this.controllerService.setMasterController(new NormalModeController(this.controllerService.getCameraController()));
        const player1 = <HumanoidObj> this.meshStore.getById('player1');
        player1.instance.setVisibility(true);
        this.activePlayerService.activate(player1);
        const player2 = this.meshStore.getById('player2');
        player2.instance.setVisibility(false);
        this.renderGuiService.render();
    }
}