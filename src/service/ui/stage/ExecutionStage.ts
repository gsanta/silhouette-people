import { MeshStore } from "../../../store/MeshStore";
import { GameStage, StageDescription, StepState } from "./GameStage";

export class ExecutionStage implements GameStage {
    
    private meshStore: MeshStore;

    constructor(meshStore: MeshStore) {
        this.meshStore = meshStore;
    }

    enterStage() {
        throw new Error("Method not implemented.");
    }

    getStepDescription(): StageDescription {
        const stageDescription: Partial<StageDescription> = {
            text: 'Execute'
        }

        stageDescription.steps = this.meshStore.getPlayers().map(player => {
            return {
                state: StepState.Undefined
            }
        });

        return <StageDescription> stageDescription;

    }
}