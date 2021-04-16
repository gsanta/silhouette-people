import { MeshObj, Character, Bike } from "../../../model/objs/MeshObj";
import { AbstractMeshState, MeshStateName } from "../../../model/states/AbstractMeshState";
import { BikeIdleState } from "../../../model/bike/BikeIdleState";
import { BikeMovingState } from "../../../model/bike/BikeMovingState";
import { EnemyIdleState } from "../../../model/states/EnemyIdleState";
import { EnemyMovingState } from "../../../model/states/EnemyMovingState";
import { PlayerIdleState } from "../../../model/states/PlayerIdleState";
import { PlayerMovingState } from "../../../model/states/PlayerMovingState";
import { Lookup } from "../../Lookup";
import { AbstractFactoryFeature } from "./AbstractFactoryFeacture";
import { MeshState } from "../../../model/states/MeshState";


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

    processFeature(mesh: MeshObj, attrs: string[]) {
        const [state] = attrs;

        mesh.state = this.createState(mesh, state as MeshStateName);
        mesh.state.enterState();
    }

    private createState(gameObj: MeshObj, stateName: MeshStateName): MeshState {
        switch(stateName) {
            case MeshStateName.PlayerIdleState:
                return new PlayerIdleState(gameObj as Character);
            case MeshStateName.PlayerMovingState:
                return new PlayerMovingState(gameObj as Character);
            case MeshStateName.BikeIdleState:
                return new BikeIdleState(gameObj as Bike);
            case MeshStateName.BikeMovingState:
                return new BikeMovingState(gameObj as Bike);
        }
    }
}