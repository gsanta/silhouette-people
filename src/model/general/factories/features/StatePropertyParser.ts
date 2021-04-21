import { BikeIdleState } from "../../../bike/BikeIdleState";
import { BikeMovingState } from "../../../bike/BikeMovingState";
import { MeshStateName } from "../../state/AbstractMeshState";
import { CharacterIdleState } from "../../../character/states/CharacterIdleState";
import { CharacterWalkingState } from "../../../character/states/CharacterWalkingState";
import { MeshState } from "../../state/MeshState";
import { AbstractPropertyParser } from "../AbstractPropertyParser";
import { CharacterObj } from "../../objs/CharacterObj";

export class StatePropertyParser extends AbstractPropertyParser {
    feature = 'State';

    isAsync(): boolean {
        return false;
    }

    processFeature(mesh: CharacterObj, attrs: string[]) {
        const [state] = attrs;

        mesh.animationState = this.createState(mesh, state as MeshStateName);
        mesh.animationState.enterState();
    }

    private createState(gameObj: CharacterObj, stateName: MeshStateName): MeshState {
        switch(stateName) {
            case MeshStateName.CharacterIdleState:
                return new CharacterIdleState(gameObj);
            case MeshStateName.CharacterWalkingState:
                return new CharacterWalkingState(gameObj);
            case MeshStateName.BikeIdleState:
                return new BikeIdleState(gameObj);
            case MeshStateName.BikeMovingState:
                return new BikeMovingState(gameObj);
        }
    }
}