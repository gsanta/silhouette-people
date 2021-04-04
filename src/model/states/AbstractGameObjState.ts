import { GameObj } from "../objs/GameObj";

export enum GameObjStateName {
    PlayerIdleState = 'PlayerIdleState',
    PlayerMovingState = 'PlayerMovingState',
    PlayerBikeState = 'PlayerBikeState',
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

    updateInput(): AbstractGameObjState { return undefined; }
    updatePhysics(): AbstractGameObjState { return undefined; }
    updateAnimation(): void {};

    keyboard(e: KeyboardEvent, isKeydown: boolean): AbstractGameObjState { return undefined; }

    enter() {}
    exit() {}
}