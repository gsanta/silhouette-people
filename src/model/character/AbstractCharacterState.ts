import { GameObject } from "../GameObject";
import { World } from "../World";

export enum GameObjectStateType {
    Idle = 'Idle',
    Walking = 'Walking',
    EnemySearching = 'EnemySearching',
    EnemyIdle = 'EnemyIdle'
}

export abstract class AbstractCharacterState {
    readonly type: GameObjectStateType;

    constructor(type: GameObjectStateType) {
        this.type = type;
    }

    updateInput(gameObject: GameObject, world: World): AbstractCharacterState { return undefined; }
    updatePhysics(gameObject: GameObject, world: World): AbstractCharacterState { return undefined; }
    
    updateAnimation(gameObject: GameObject, world: World): void {};

    enter(gameObject: GameObject, world: World) {}
    exit(gameObject: GameObject, world: World) {}
}