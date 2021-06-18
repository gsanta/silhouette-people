import { GameObject } from "../../../model/objects/game_object/GameObject";
import { GameObjectStateName, GameObjectState } from "../../../model/objects/game_object/GameObjectState";
import { StateController } from "../../../model/objects/game_object/StateController";
import { BikeIdleState } from "../../../model/objects/game_object/types/bike/states/BikeIdleState";
import { HumanIdleState } from "../../../model/objects/game_object/types/human/states/HumanIdleState";
import { HumanWalkingState } from "../../../model/objects/game_object/types/human/states/HumanWalkingState";
import { AbstractPropertyParser } from "../AbstractPropertyParser";

export class StatePropertyParser extends AbstractPropertyParser<string> {
    propName = 'state';

    isAsync(): boolean {
        return false;
    }

    processProperty(mesh: GameObject, stateName: string) {
        const state = this.createState(mesh, stateName as GameObjectStateName);
        
        mesh.stateController = new StateController();
        mesh.stateController.state = state;
    }

    private createState(gameObj: GameObject, stateName: GameObjectStateName): GameObjectState {
        switch(stateName) {
            case GameObjectStateName.CharacterIdleState:
                return new HumanIdleState(gameObj);
            case GameObjectStateName.CharacterWalkingState:
                return new HumanWalkingState(gameObj);
            case GameObjectStateName.BikeIdleState:
                return new BikeIdleState(gameObj, null);
        }
    }
}