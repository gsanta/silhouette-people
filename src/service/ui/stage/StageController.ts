import { GameStage } from "./GameStage";


export class StageController {
    stages: GameStage[] = [];
    private activeStage: GameStage;

    addStage(stage: GameStage) {
        this.stages.push(stage);

        if (this.stages.length === 1) {
            this.activeStage = this.stages[0];
        }
    }

    getActiveStage() {
        return this.activeStage;
    }

    enterNextStage() {
        const index = (this.stages.indexOf(this.activeStage) + 1) % this.stages.length;
        this.activeStage = this.stages[index];
        this.activeStage.enterStage();
    }
}