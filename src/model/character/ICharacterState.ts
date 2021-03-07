import { GameObject } from "../GameObject";
import { World } from "../World";

export abstract class AbstractCharacterState {
    abstract updateInput(gameObject: GameObject, world: World): AbstractCharacterState;
    abstract updatePhysics(gameObject: GameObject, world: World): AbstractCharacterState;
    
    updateAnimation(gameObject: GameObject, world: World): void {};

    enter(gameObject: GameObject, world: World) {}
    exit(gameObject: GameObject, world: World) {}
}