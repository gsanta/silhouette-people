import { CharacterObj } from "../../../model/object/character/CharacterObj";
import { MeshStore } from "../../../store/MeshStore";
import { ActivePlayerService } from "../../ActivePlayerService";
import { ToolService } from "../../edit/ToolService";
import { GameStage, StageDescription, StepState } from "./GameStage";
import { PlayerChooserHelper } from "./helpers/PlayerChooserHelper";
import { StageController } from "./StageController";

export class RouteDefinitionStage implements GameStage {

    private toolService: ToolService;
    private meshStore: MeshStore;
    private activePlayerService: ActivePlayerService;
    private stageController: StageController;
    private playerChooserHelper: PlayerChooserHelper;
    private players: CharacterObj[] = [];


    constructor(stageController: StageController, toolService: ToolService, meshStore: MeshStore, activePlayerService: ActivePlayerService) {
        this.stageController = stageController;
        this.toolService = toolService;
        this.meshStore = meshStore;
        this.activePlayerService = activePlayerService;
        this.onRouteFinished = this.onRouteFinished.bind(this);
    }

    initStage() {
        this.players = this.meshStore.getPlayers();
        this.playerChooserHelper = new PlayerChooserHelper(this.players);
        this.toolService.path.onFinished(this.onRouteFinished);
    }

    enterStage() {
        this.playerChooserHelper = new PlayerChooserHelper(this.players);
        this.executeStep();
    }

    executeStep() {
        const activePlayer = this.playerChooserHelper.determineNextActivePlayer();

        if (activePlayer) {
            this.activePlayerService.activate(activePlayer);
            this.toolService.setSelectedTool(this.toolService.path);
        } else {
            this.stageController.enterNextStage()
        }
    }

    getStepDescription(): StageDescription {
        const stageDescription: Partial<StageDescription> = {
            text: 'Draw routes'
        }

        const activePlayer = this.playerChooserHelper ? this.playerChooserHelper.getActivePlayer() : undefined;
        stageDescription.steps = this.players.map(player => {
            let state: StepState = StepState.Undefined;

            if (this.playerChooserHelper && this.playerChooserHelper.isPlayerFinished(player)) {
                state = StepState.Defined;
            } else if (activePlayer === player) {
                state = StepState.Pending;
            }

            return {
                state
            }
        });

        return <StageDescription> stageDescription;
    }

    private onRouteFinished(wasCanceled: boolean) {
        if (!wasCanceled) {
            this.playerChooserHelper.finishActivePlayer()
            this.executeStep();
        }
    }
}