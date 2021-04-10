import { MeshObj } from "../../../model/objs/MeshObj";
import { AbstractMeshObjState, MeshObjStateName } from "../../../model/states/AbstractMeshObjState";
import { BikeIdleState } from "../../../model/states/BikeIdleState";
import { BikeMovingState } from "../../../model/states/BikeMovingState";
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

        const initState = this.createState(gameObj, state as MeshObjStateName);
        gameObj.state = new StateComponent(initState);
    }

    private createState(gameObj: MeshObj, stateName: MeshObjStateName): AbstractMeshObjState {
        switch(stateName) {
            case MeshObjStateName.PlayerIdleState:
                return new PlayerIdleState(gameObj);
            case MeshObjStateName.PlayerMovingState:
                return new PlayerMovingState(gameObj);
            case MeshObjStateName.EnemyIdleState:
                return new EnemyIdleState(gameObj);
            case MeshObjStateName.EnemyMovingState:
                return new EnemyMovingState(gameObj, this.world);
            case MeshObjStateName.BikeIdleState:
                return new BikeIdleState(gameObj, this.world);
            case MeshObjStateName.BikeMovingState:
                return new BikeMovingState(gameObj, this.world);
        }
    }
}