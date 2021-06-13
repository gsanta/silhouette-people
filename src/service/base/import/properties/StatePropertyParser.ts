import { BikeIdleState } from "../../../../model/objects/game_object/types/bike/states/BikeIdleState";
import { CharacterIdleState } from "../../../../model/item/character/states/CharacterIdleState";
import { CharacterWalkingState } from "../../../../model/item/character/states/CharacterWalkingState";
import { MeshState, MeshStateName } from "../../../../model/item/mesh/MeshState";
import { AbstractPropertyParser } from "../AbstractPropertyParser";
import { StateController } from "../../../../model/objects/game_object/controller_state/StateController";
import { GameObject } from "../../../../model/objects/game_object/GameObject";

export class StatePropertyParser extends AbstractPropertyParser<string> {
    propName = 'state';

    isAsync(): boolean {
        return false;
    }

    processProperty(mesh: GameObject, stateName: string) {
        const state = this.createState(mesh, stateName as MeshStateName);
        
        mesh.stateController = new StateController();
        mesh.stateController.state = state;
    }

    private createState(gameObj: GameObject, stateName: MeshStateName): MeshState {
        switch(stateName) {
            case MeshStateName.CharacterIdleState:
                return new CharacterIdleState(gameObj);
            case MeshStateName.CharacterWalkingState:
                return new CharacterWalkingState(gameObj);
            case MeshStateName.BikeIdleState:
                return new BikeIdleState(gameObj, null);
        }
    }
}