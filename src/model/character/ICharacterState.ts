import { GameObject } from "../GameObject";
import { World } from "../World";

export abstract class AbstractCharacterState {
    abstract updateInput(gameObject: GameObject, world: World): AbstractCharacterState;
    abstract updatePhysics(gameObject: GameObject, world: World): AbstractCharacterState;

    enter(gameObject: GameObject, world: World) {}
    exit(gameObject: GameObject, world: World) {}
}