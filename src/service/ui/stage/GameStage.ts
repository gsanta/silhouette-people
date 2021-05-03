import { StageDescription } from "./StageDescription";

export interface GameStage {
    resetStage();
    enterStage();
    nextStep();

    getStageDescription(): StageDescription;
}