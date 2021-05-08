import { CharacterItem } from "../../../model/item/character/CharacterItem";
import { MeshStore } from "../../../store/MeshStore";
import { ActivePlayerService } from "../../ActivePlayerService";
import { PlayerStore } from "../../player/PlayerStore";
import { GameStage } from "../../ui/stage/GameStage";
import { PlayerChooserHelper } from "../../ui/stage/helpers/PlayerChooserHelper";
import { StageDescriptionHelper } from "../../ui/stage/helpers/StageDescriptionHelper";
import { StageController } from "../../ui/stage/StageController";
import { StageDescription } from "../../ui/stage/StageDescription";
import { ToolService } from "../ToolService";

export class RouteStage implements GameStage {

    private toolService: ToolService;
    private playerStore: PlayerStore;
    private activePlayerService: ActivePlayerService;
    private stageController: StageController;
    private playerChooserHelper: PlayerChooserHelper;
    private stageDescriptionHelper: StageDescriptionHelper;
    private players: CharacterItem[] = [];

    constructor(stageController: StageController, toolService: ToolService, playerStore: PlayerStore, activePlayerService: ActivePlayerService) {
        this.stageController = stageController;
        this.toolService = toolService;
        this.playerStore = playerStore;
        this.activePlayerService = activePlayerService;
        this.playerChooserHelper = new PlayerChooserHelper();
        this.stageDescriptionHelper = new StageDescriptionHelper('Draw Route', this.playerChooserHelper);
        this.onRouteFinished = this.onRouteFinished.bind(this);
        this.toolService.path.onFinished(this.onRouteFinished);
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
        if (!this.toolService.path.isReset()) {
            this.toolService.path.reset();
        }

        const activePlayer = this.playerChooserHelper.determineNextActivePlayer();

        if (activePlayer) {
            this.activePlayerService.activate(activePlayer);
            this.toolService.setSelectedTool(this.toolService.path);
        } else {
            this.stageController.enterNextStage()
        }
    }

    getStageDescription(): StageDescription {
        return this.stageDescriptionHelper.getDescription();
    }

    private onRouteFinished(wasCanceled: boolean) {
        if (!wasCanceled) {
            this.playerChooserHelper.finishActivePlayer()
            this.nextStep();
        }
    }
}