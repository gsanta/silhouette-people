import { MeshObj } from "../../../model/objs/MeshObj";
import { AbstractMeshState, MeshStateName } from "../../../model/states/AbstractMeshState";
import { BikeIdleState } from "../../../model/bike/BikeIdleState";
import { BikeMovingState } from "../../../model/bike/BikeMovingState";
import { EnemyIdleState } from "../../../model/states/EnemyIdleState";
import { EnemyMovingState } from "../../../model/states/EnemyMovingState";
import { PlayerIdleState } from "../../../model/states/PlayerIdleState";
import { PlayerMovingState } from "../../../model/states/PlayerMovingState";
import { Lookup } from "../../Lookup";
import { StateComponent } from "../../../model/components/StateComponent";
import { AbstractFactoryFeature } from "./AbstractFactoryFeacture";


export class StateFactoryFeature extends AbstractFactoryFeature {

    private world: Lookup;

    constructor(world: Lookup) {
        super();
        this.world = world;
    }

    feature = 'State';

    isAsync(): boolean {
        return false;
    }

    processFeature(gameObj: MeshObj, attrs: string[]) {
        const [state] = attrs;

        const initState = this.createState(gameObj, state as MeshStateName);
        gameObj.state = new StateComponent(initState);
    }

    private createState(gameObj: MeshObj, stateName: MeshStateName): AbstractMeshState {
        switch(stateName) {
            case MeshStateName.PlayerIdleState:
                return new PlayerIdleState(gameObj);
            case MeshStateName.PlayerMovingState:
                return new PlayerMovingState(gameObj);
            case MeshStateName.EnemyIdleState:
                return new EnemyIdleState(gameObj);
            case MeshStateName.EnemyMovingState:
                return new EnemyMovingState(gameObj);
            case MeshStateName.BikeIdleState:
                return new BikeIdleState(gameObj);
            case MeshStateName.BikeMovingState:
                return new BikeMovingState(gameObj);
        }
    }
}