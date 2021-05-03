import { MeshStore } from "../../../store/MeshStore";
import { ActivePlayerService } from "../../ActivePlayerService";
import { RenderGuiService } from "../RenderGuiService";
import { GameStage } from "./GameStage";
import { StageController } from "./StageController";
import { StageDescription } from "./StageDescription";


export class NextTurnStage implements GameStage {

    private renderGuiService: RenderGuiService;
    private stageController: StageController;
    private activePlayerService: ActivePlayerService;
    private meshStore: MeshStore;

    constructor(stageController: StageController, renderGuiService: RenderGuiService, meshStore: MeshStore, activePlayerService: ActivePlayerService) {
        this.renderGuiService = renderGuiService;
        this.stageController = stageController;
        this.meshStore = meshStore;
        this.activePlayerService = activePlayerService;
    }

    resetStage() {}
    
    enterStage() {
        this.renderGuiService.render();
    }

    nextStep() {
        this.activePlayerService.activate(this.meshStore.getPlayers()[0]);
        this.stageController.stages.forEach(stage => stage.resetStage());
        this.stageController.enterNextStage();
        this.renderGuiService.render();
    }

    getStageDescription(): StageDescription {
        const stageDescription: StageDescription = {
            text: 'Next Turn',
            steps: []
        }

        return stageDescription;
    }
}