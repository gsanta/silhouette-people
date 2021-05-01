import { InjectProperty } from "../../../di/diDecorators";
import { MeshStore } from "../../../store/MeshStore";
import { RouteStore } from "../../../store/RouteStore";
import { ActivePlayerService } from "../../ActivePlayerService";
import { ToolService } from "../../edit/ToolService";
import { lookup } from "../../Lookup";
import { ExecutionStage } from "./ExecutionStage";
import { RouteDefinitionStage } from "./RouteDefinitionStage";
import { StageController } from "./StageController";


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


    private routeDefinitionStage: RouteDefinitionStage;
    private executionStage: ExecutionStage;

    constructor() {
        this.stageController = lookup.stageController;
        this.toolService = lookup.toolService;
        this.meshStore = lookup.meshStore;
        this.routeStore = lookup.routeStore;
        this.activePlayerService = lookup.activePlayerService;
    }

    setup() {

        if (!this.routeDefinitionStage) {
            this.routeDefinitionStage = new RouteDefinitionStage(this.toolService, this.meshStore, this.activePlayerService, this.routeStore);
        }

        if (!this.executionStage) {
            this.executionStage = new ExecutionStage(this.meshStore);
        }

        this.stageController.addStage(this.routeDefinitionStage);
        this.stageController.addStage(this.executionStage);
        // this.stageController.addStage()
    }
}