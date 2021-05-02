import { StageDescription } from "./StageDescription";

export interface GameStage {
    initStage();
    enterStage();

    getStageDescription(): StageDescription;
}