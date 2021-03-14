import { GameObject } from "../GameObject";

export enum GameObjectStateType {
    Idle = 'Idle',
    Walking = 'Walking',
    EnemySearching = 'EnemySearching',
    EnemyIdle = 'EnemyIdle'
}

export abstract class AbstractCharacterState {
    readonly type: GameObjectStateType;
    protected readonly gameObject: GameObject;

    constructor(type: GameObjectStateType, gameObject: GameObject) {
        this.type = type;
        this.gameObject = gameObject;
    }

    updateInput(): AbstractCharacterState { return undefined; }
    updatePhysics(): AbstractCharacterState { return undefined; }
    updateAnimation(): void {};

    enter() {}
    exit() {}
}