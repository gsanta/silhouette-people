import { BikeIdleState } from "../../../bike/BikeIdleState";
import { BikeMovingState } from "../../../bike/BikeMovingState";
import { Bike, Character, MeshObj } from "../../objs/MeshObj";
import { MeshStateName } from "../../state/AbstractMeshState";
import { CharacterIdleState } from "../../../character/states/CharacterIdleState";
import { CharacterWalkingState } from "../../../character/states/CharacterWalkingState";
import { MeshState } from "../../state/MeshState";
import { AbstractPropertyParser } from "../AbstractPropertyParser";


export class StatePropertyParser extends AbstractPropertyParser {
    feature = 'State';

    isAsync(): boolean {
        return false;
    }

    processFeature(mesh: MeshObj, attrs: string[]) {
        const [state] = attrs;

        mesh.state = this.createState(mesh, state as MeshStateName);
        mesh.state.enterState();
    }

    private createState(gameObj: MeshObj, stateName: MeshStateName): MeshState<MeshObj> {
        switch(stateName) {
            case MeshStateName.CharacterIdleState:
                return new CharacterIdleState(gameObj as Character);
            case MeshStateName.CharacterWalkingState:
                return new CharacterWalkingState(gameObj as Character);
            case MeshStateName.BikeIdleState:
                return new BikeIdleState(gameObj as Bike);
            case MeshStateName.BikeMovingState:
                return new BikeMovingState(gameObj as Bike);
        }
    }
}