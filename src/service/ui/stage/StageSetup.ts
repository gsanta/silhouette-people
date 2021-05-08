import { InjectProperty } from "../../../di/diDecorators";
import { ActivePlayerService } from "../../ActivePlayerService";
import { ExecutionStage } from "../../edit/execution/ExecutionStage";
import { RouteStage } from "../../edit/route/RouteStage";
import { ToolService } from "../../edit/ToolService";
import { lookup } from "../../Lookup";
import { PlayerStore } from "../../player/PlayerStore";
import { RenderGuiService } from "../RenderGuiService";
import { NextTurnStage } from "./NextTurnStage";
import { StageController } from "./StageController";


export class StageSetup {

    @InjectProperty('StageController')
    private stageController: StageController;

    @InjectProperty('ToolService')
    private toolService: ToolService;

    @InjectProperty('PlayerStore')
    private playerStore: PlayerStore;

    @InjectProperty('ActivePlayerService')
    private activePlayerService: ActivePlayerService;

    @InjectProperty('RenderGuiService')
    private renderGuiService: RenderGuiService;


    private routeDefinitionStage: RouteStage;
    private executionStage: ExecutionStage;
    private nextTurnStage: NextTurnStage;

    constructor() {
        this.stageController = lookup.stageController;
        this.toolService = lookup.toolService;
        this.playerStore = lookup.playerStore;
        this.activePlayerService = lookup.activePlayerService;
        this.renderGuiService = lookup.renderGui;
    }

    setup() {

        if (!this.routeDefinitionStage) {
            this.routeDefinitionStage = new RouteStage(this.stageController, this.toolService, this.playerStore, this.activePlayerService);
        }

        if (!this.executionStage) {
            this.executionStage = new ExecutionStage(this.stageController, this.toolService, this.playerStore, this.activePlayerService);
        }

        if (!this.nextTurnStage) {
            this.nextTurnStage = new NextTurnStage(this.stageController, this.renderGuiService, this.playerStore, this.activePlayerService);
        }

        this.stageController.addStage(this.routeDefinitionStage);
        this.stageController.addStage(this.executionStage);
        this.stageController.addStage(this.nextTurnStage);
        // this.stageController.addStage()
    }
}