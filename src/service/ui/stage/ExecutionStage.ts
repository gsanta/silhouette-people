import { CharacterObj } from "../../../model/object/character/CharacterObj";
import { MeshStore } from "../../../store/MeshStore";
import { ActivePlayerService } from "../../ActivePlayerService";
import { ToolService } from "../../edit/ToolService";
import { GameStage, StageDescription, StepState } from "./GameStage";
import { PlayerChooserHelper } from "./helpers/PlayerChooserHelper";
import { StageController } from "./StageController";

export class ExecutionStage implements GameStage {
    private meshStore: MeshStore;
    private players: CharacterObj[];
    private playerChooserHelper: PlayerChooserHelper;
    private activePlayerService: ActivePlayerService;
    private toolService: ToolService;
    private stageController: StageController;

    constructor(stageController: StageController, toolService: ToolService, meshStore: MeshStore, activePlayerService: ActivePlayerService) {
        this.stageController = stageController;
        this.toolService = toolService;
        this.meshStore = meshStore;
        this.activePlayerService = activePlayerService;

        this.onExecutionFinished = this.onExecutionFinished.bind(this);
    }

    initStage() {
        this.players = this.meshStore.getPlayers();
        this.playerChooserHelper = new PlayerChooserHelper(this.players);
        this.toolService.execute.onFinished(this.onExecutionFinished);
    }

    enterStage() {
        this.executeStep();
    }

    private executeStep() {
        const activePlayer = this.playerChooserHelper.determineNextActivePlayer();

        if (activePlayer) {
            this.activePlayerService.activate(activePlayer);
            this.toolService.setSelectedTool(this.toolService.execute);
        } else {
            this.stageController.enterNextStage();
        }
    }

    getStepDescription(): StageDescription {
        const stageDescription: Partial<StageDescription> = {
            text: 'Execute',
            steps: []
        }

        if (this.players) {
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
        }

        return <StageDescription> stageDescription;
    }

    private onExecutionFinished(wasCanceled: boolean) {
        if (!wasCanceled) {
            this.playerChooserHelper.finishActivePlayer()
            this.executeStep();
        }
    }
}