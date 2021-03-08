import { GameObject } from "../GameObject";
import { World } from "../World";

export abstract class AbstractCharacterState {
    updateInput(gameObject: GameObject, world: World): AbstractCharacterState { return undefined; }
    updatePhysics(gameObject: GameObject, world: World): AbstractCharacterState { return undefined; }
    
    updateAnimation(gameObject: GameObject, world: World): void {};

    enter(gameObject: GameObject, world: World) {}
    exit(gameObject: GameObject, world: World) {}
}