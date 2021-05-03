import { CharacterObj } from "../../../model/object/character/CharacterObj";
import { MeshStore } from "../../../store/MeshStore";
import { ActivePlayerService } from "../../ActivePlayerService";
import { ToolService } from "../ToolService";
import { GameStage } from "../../ui/stage/GameStage";
import { PlayerChooserHelper } from "../../ui/stage/helpers/PlayerChooserHelper";
import { StageDescriptionHelper } from "../../ui/stage/helpers/StageDescriptionHelper";
import { StageController } from "../../ui/stage/StageController";
import { StageDescription, StepState } from "../../ui/stage/StageDescription";

export class ExecutionStage implements GameStage {
    private meshStore: MeshStore;
    private players: CharacterObj[];
    private activePlayerService: ActivePlayerService;
    private toolService: ToolService;
    private stageController: StageController;
    private playerChooserHelper: PlayerChooserHelper;
    private stageDescriptionHelper: StageDescriptionHelper;

    constructor(stageController: StageController, toolService: ToolService, meshStore: MeshStore, activePlayerService: ActivePlayerService) {
        this.stageController = stageController;
        this.toolService = toolService;
        this.meshStore = meshStore;
        this.activePlayerService = activePlayerService;

        this.playerChooserHelper = new PlayerChooserHelper();
        this.stageDescriptionHelper = new StageDescriptionHelper('Execute', this.playerChooserHelper);

        this.onExecutionFinished = this.onExecutionFinished.bind(this);
        this.toolService.execute.onFinished(this.onExecutionFinished);
    }

    resetStage() {
        this.players = this.meshStore.getPlayers();
        this.playerChooserHelper.setPlayers(this.players);
        this.stageDescriptionHelper.setPlayers(this.players);
    }

    enterStage() {
        this.nextStep();
    }

    nextStep() {
        const activePlayer = this.playerChooserHelper.determineNextActivePlayer();

        if (activePlayer) {
            this.activePlayerService.activate(activePlayer);
            this.toolService.setSelectedTool(this.toolService.execute);
        } else {
            this.stageController.enterNextStage();
        }
    }

    getStageDescription(): StageDescription {
        return this.stageDescriptionHelper.getDescription();
    }

    private onExecutionFinished(wasCanceled: boolean) {
        if (!wasCanceled) {
            this.playerChooserHelper.finishActivePlayer()
            this.nextStep();
        }
    }
}