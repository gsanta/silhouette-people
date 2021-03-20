import { GameObj } from "../objs/GameObj";

export enum GameObjectStateType {
    Idle = 'Idle',
    Walking = 'Walking',
    EnemySearching = 'EnemySearching',
    EnemyIdle = 'EnemyIdle'
}

export abstract class AbstractCharacterState {
    readonly type: GameObjectStateType;
    protected readonly gameObject: GameObj;

    constructor(type: GameObjectStateType, gameObject: GameObj) {
        this.type = type;
        this.gameObject = gameObject;
    }

    updateInput(): AbstractCharacterState { return undefined; }
    updatePhysics(): AbstractCharacterState { return undefined; }
    updateAnimation(): void {};

    enter() {}
    exit() {}
}