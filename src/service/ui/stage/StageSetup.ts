import { InjectProperty } from "../../../di/diDecorators";
import { MeshStore } from "../../../store/MeshStore";
import { RouteStore } from "../../../store/RouteStore";
import { ActivePlayerService } from "../../ActivePlayerService";
import { ToolService } from "../../edit/ToolService";
import { lookup } from "../../Lookup";
import { ExecutionStage } from "../../edit/execution/ExecutionStage";
import { RouteStage } from "../../edit/route/RouteStage";
import { StageController } from "./StageController";
import { NextTurnStage } from "./NextTurnStage";
import { RenderGuiService } from "../RenderGuiService";


export class StageSetup {

    @InjectProperty('StageController')
    private stageController: StageController;

    @InjectProperty('ToolService')
    private toolService: ToolService;

    @InjectProperty('MeshStore')
    private meshStore: MeshStore;

    @InjectProperty('RouteStore')
    private routeStore: RouteStore;

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
        this.meshStore = lookup.meshStore;
        this.routeStore = lookup.routeStore;
        this.activePlayerService = lookup.activePlayerService;
        this.renderGuiService = lookup.renderGui;
    }

    setup() {

        if (!this.routeDefinitionStage) {
            this.routeDefinitionStage = new RouteStage(this.stageController, this.toolService, this.meshStore, this.activePlayerService);
        }

        if (!this.executionStage) {
            this.executionStage = new ExecutionStage(this.stageController, this.toolService, this.meshStore, this.activePlayerService);
        }

        if (!this.nextTurnStage) {
            this.nextTurnStage = new NextTurnStage(this.stageController, this.renderGuiService, this.meshStore, this.activePlayerService);
        }

        this.stageController.addStage(this.routeDefinitionStage);
        this.stageController.addStage(this.executionStage);
        this.stageController.addStage(this.nextTurnStage);
        // this.stageController.addStage()
    }
}