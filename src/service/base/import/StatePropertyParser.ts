import { BikeIdleState } from "../../../model/object/bike/states/BikeIdleState";
import { BikeMovingState } from "../../../model/object/bike/states/BikeMovingState";
import { MeshStateName } from "../../../model/object/mesh/AbstractMeshState";
import { CharacterIdleState } from "../../../model/object/character/states/CharacterIdleState";
import { CharacterWalkingState } from "../../../model/object/character/states/CharacterWalkingState";
import { MeshState } from "../../../model/object/mesh/MeshState";
import { AbstractPropertyParser } from "./AbstractPropertyParser";
import { CharacterObj } from "../../../model/object/character/CharacterObj";

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