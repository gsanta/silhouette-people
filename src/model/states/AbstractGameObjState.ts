import { GameObj } from "../objs/GameObj";

export enum GameObjectStateType {
    Idle = 'Idle',
    Walking = 'Walking',
    EnemySearching = 'EnemySearching',
    EnemyIdle = 'EnemyIdle'
}

export abstract class AbstractGameObjState {
    readonly type: GameObjectStateType;
    protected readonly gameObject: GameObj;

    constructor(type: GameObjectStateType, gameObject: GameObj) {
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