

export enum StepState {
    Undefined = 'Undefined',
    Pending = 'Pending',
    Defined = 'Defined'
}

export interface StepDescription {
    state: StepState;
}

export interface StageDescription {
    text: string;
    steps: StepDescription[];
} 