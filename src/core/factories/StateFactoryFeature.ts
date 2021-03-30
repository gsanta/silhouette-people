import { GameObj } from "../../model/objs/GameObj";
import { AbstractGameObjState, GameObjStateName } from "../../model/states/AbstractGameObjState";
import { BikeIdleState } from "../../model/states/BikeIdleState";
import { BikeMovingState } from "../../model/states/BikeMovingState";
import { EnemyIdleState } from "../../model/states/EnemyIdleState";
import { EnemyMovingState } from "../../model/states/EnemyMovingState";
import { PlayerIdleState } from "../../model/states/PlayerIdleState";
import { PlayerMovingState } from "../../model/states/PlayerMovingState";
import { World } from "../../services/World";
import { StateComponent } from "../components/StateComponent";
import { AbstractFactoryFeature } from "./AbstractFactoryFeacture";


export class StateFactoryFeature extends AbstractFactoryFeature {

    private world: World;

    constructor(world: World) {
        super();
        this.world = world;
    }

    feature = 'State';

    isAsync(): boolean {
        return false;
    }

    processFeature(gameObj: GameObj, feature: string) {
        const [_feature, state] = feature.split(' ');

        const initState = this.createState(gameObj, state as GameObjStateName);
        gameObj.state = new StateComponent(initState, this.world);
    }

    private createState(gameObj: GameObj, stateName: GameObjStateName): AbstractGameObjState {
        switch(stateName) {
            case GameObjStateName.PlayerIdleState:
                return new PlayerIdleState(gameObj, this.world);
            case GameObjStateName.PlayerMovingState:
                return new PlayerMovingState(gameObj, this.world);
            case GameObjStateName.EnemyIdleState:
                return new EnemyIdleState(gameObj);
            case GameObjStateName.EnemyMovingState:
                return new EnemyMovingState(gameObj, this.world);
            case GameObjStateName.BikeIdleState:
                return new BikeIdleState(gameObj, this.world);
            case GameObjStateName.BikeMovingState:
                return new BikeMovingState(gameObj, this.world);
        }
    }
}