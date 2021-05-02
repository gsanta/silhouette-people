import { CharacterObj } from "../../../model/object/character/CharacterObj";

export enum StepState {
    Undefined = 'Undefined',
    Pending = 'Pending',
    Defined = 'Defined'
}

export interface StageDescription {
    text: string;
    steps: {
        state: StepState
    }[];
} 

export interface GameStage {
    initStage();
    enterStage();

    getStepDescription(): StageDescription;
}