import { BikeIdleState } from "../../../../model/item/bike/states/BikeIdleState";
import { BikeMovingState } from "../../../../model/item/bike/states/BikeMovingState";
import { MeshStateName } from "../../../../model/item/mesh/AbstractMeshState";
import { CharacterIdleState } from "../../../../model/item/character/states/CharacterIdleState";
import { CharacterWalkingState } from "../../../../model/item/character/states/CharacterWalkingState";
import { MeshState } from "../../../../model/item/mesh/MeshState";
import { AbstractPropertyParser } from "../AbstractPropertyParser";
import { BikeItem, CharacterItem } from "../../../../model/item/character/CharacterItem";

export class StatePropertyParser extends AbstractPropertyParser<string> {
    propName = 'state';

    isAsync(): boolean {
        return false;
    }

    processProperty(mesh: CharacterItem, stateName: string) {
        mesh.animationState = this.createState(mesh, stateName as MeshStateName);
        mesh.animationState.enterState();
    }

    private createState(gameObj: CharacterItem, stateName: MeshStateName): MeshState {
        switch(stateName) {
            case MeshStateName.CharacterIdleState:
                return new CharacterIdleState(gameObj);
            case MeshStateName.CharacterWalkingState:
                return new CharacterWalkingState(gameObj);
            case MeshStateName.BikeIdleState:
                return new BikeIdleState(<BikeItem> gameObj, null);
            // case MeshStateName.BikeMovingState:
            //     return new BikeMovingState(gameObj);
        }
    }
}