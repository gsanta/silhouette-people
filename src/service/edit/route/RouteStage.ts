import { CharacterObj } from "../../../model/object/character/CharacterObj";
import { MeshStore } from "../../../store/MeshStore";
import { ActivePlayerService } from "../../ActivePlayerService";
import { GameStage } from "../../ui/stage/GameStage";
import { PlayerChooserHelper } from "../../ui/stage/helpers/PlayerChooserHelper";
import { StageDescriptionHelper } from "../../ui/stage/helpers/StageDescriptionHelper";
import { StageController } from "../../ui/stage/StageController";
import { StageDescription } from "../../ui/stage/StageDescription";
import { ToolService } from "../ToolService";

export class RouteStage implements GameStage {

    private toolService: ToolService;
    private meshStore: MeshStore;
    private activePlayerService: ActivePlayerService;
    private stageController: StageController;
    private playerChooserHelper: PlayerChooserHelper;
    private stageDescriptionHelper: StageDescriptionHelper;
    private players: CharacterObj[] = [];

    constructor(stageController: StageController, toolService: ToolService, meshStore: MeshStore, activePlayerService: ActivePlayerService) {
        this.stageController = stageController;
        this.toolService = toolService;
        this.meshStore = meshStore;
        this.activePlayerService = activePlayerService;
        this.playerChooserHelper = new PlayerChooserHelper();
        this.stageDescriptionHelper = new StageDescriptionHelper('Draw Route', this.playerChooserHelper);
        this.onRouteFinished = this.onRouteFinished.bind(this);
        this.toolService.path.onFinished(this.onRouteFinished);
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