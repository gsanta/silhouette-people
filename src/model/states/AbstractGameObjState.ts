import { GameObj } from "../objs/GameObj";

export enum GameObjStateName {
    PlayerIdleState = 'PlayerIdleState',
    PlayerMovingState = 'PlayerMovingState',
    PlayerBikeState = 'PlayerBikeState',
    PlayerGetOnBikeState = 'PlayerGetOnBikeState',
    
    EnemyMovingState = 'EnemyMovingState',
    EnemyIdleState = 'EnemyIdleState',
    BikeIdleState = 'BikeIdleState',
    BikeMovingState = 'BikeMovingState'
}

export abstract class AbstractGameObjState {
    readonly type: GameObjStateName;
    protected readonly gameObject: GameObj;

    constructor(type: GameObjStateName, gameObject: GameObj) {
        this.type = type;
        this.gameObject = gameObject;
    }

    keyboard(e: KeyboardEvent, isKeydown: boolean): void {}
    update(): void {}

    enter() {}
    exit() {}
}