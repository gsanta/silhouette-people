import { GameObject } from "../../../model/objects/game_object/GameObject";
import { ActivePlayerService } from "../../ActivePlayerService";
import { PlayerStore } from "../../player/PlayerStore";
import { GameStage } from "../../ui/stage/GameStage";
import { PlayerChooserHelper } from "../../ui/stage/helpers/PlayerChooserHelper";
import { StageDescriptionHelper } from "../../ui/stage/helpers/StageDescriptionHelper";
import { StageController } from "../../ui/stage/StageController";
import { StageDescription } from "../../ui/stage/StageDescription";
import { ToolService } from "../ToolService";

export class ExecutionStage implements GameStage {
    private playerStore: PlayerStore;
    private players: GameObject[];
    private activePlayerService: ActivePlayerService;
    private toolService: ToolService;
    private stageController: StageController;
    private playerChooserHelper: PlayerChooserHelper;
    private stageDescriptionHelper: StageDescriptionHelper;

    constructor(stageController: StageController, toolService: ToolService, playerStore: PlayerStore, activePlayerService: ActivePlayerService) {
        this.stageController = stageController;
        this.toolService = toolService;
        this.playerStore = playerStore;
        this.activePlayerService = activePlayerService;

        this.playerChooserHelper = new PlayerChooserHelper();
        this.stageDescriptionHelper = new StageDescriptionHelper('Execute', this.playerChooserHelper);

        this.onExecutionFinished = this.onExecutionFinished.bind(this);
        this.toolService.execute.onFinished(this.onExecutionFinished);
    }

    resetStage() {
        this.players = this.playerStore.getPlayers();
        this.playerChooserHelper.setPlayers(this.players);
        this.stageDescriptionHelper.setPlayers(this.players);
    }

    enterStage() {
        this.nextStep();
    }

    nextStep() {
        // const activePlayer = this.playerChooserHelper.determineNextActivePlayer();
        const activePlayer = this.playerStore.getActivePlayer();

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