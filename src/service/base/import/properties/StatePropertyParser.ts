import { BikeIdleState } from "../../../../model/item/bike/states/BikeIdleState";
import { MeshStateName } from "../../../../model/item/mesh/AbstractMeshState";
import { CharacterIdleState } from "../../../../model/item/character/states/CharacterIdleState";
import { CharacterWalkingState } from "../../../../model/item/character/states/CharacterWalkingState";
import { MeshState } from "../../../../model/item/mesh/MeshState";
import { AbstractPropertyParser } from "../AbstractPropertyParser";
import { StateController } from "../../../../model/item/game_object/state/StateController";
import { MeshItem } from "../../../../model/item/mesh/MeshItem";

export class StatePropertyParser extends AbstractPropertyParser<string> {
    propName = 'state';

    isAsync(): boolean {
        return false;
    }

    processProperty(mesh: MeshItem, stateName: string) {
        const state = this.createState(mesh, stateName as MeshStateName);
        
        mesh.stateController = new StateController();
        mesh.stateController.state = state;
    }

    private createState(gameObj: MeshItem, stateName: MeshStateName): MeshState {
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