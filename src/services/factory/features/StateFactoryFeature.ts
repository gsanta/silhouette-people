import { BikeIdleState } from "../../../model/bike/BikeIdleState";
import { BikeMovingState } from "../../../model/bike/BikeMovingState";
import { Bike, Character, MeshObj } from "../../../model/objs/MeshObj";
import { MeshStateName } from "../../../model/states/AbstractMeshState";
import { CharacterIdleState } from "../../../model/states/CharacterIdleState";
import { CharacterWalkingState } from "../../../model/states/CharacterWalkingState";
import { MeshState } from "../../../model/states/MeshState";
import { AbstractFactoryFeature } from "./AbstractFactoryFeacture";


export class StateFactoryFeature extends AbstractFactoryFeature {
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