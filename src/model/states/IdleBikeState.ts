import { World } from "../../services/World";
import { GameObj, GameObjTag } from "../objs/GameObj";
import { AbstractGameObjState } from "./AbstractGameObjState";
import { MovingBikeState } from "./MovingBikeState";

export class IdleBikeState extends AbstractGameObjState {
    private world: World;

    constructor(gameObject: GameObj, world: World) {
        super(undefined, gameObject);
        this.world = world;
    }

    keyboard(e: KeyboardEvent, isKeyDown: boolean) {
        if (!this.gameObject.tag.isPlayer()) { return undefined; }
    
        const keyboard = this.world.keyboard;
    
        if (
            keyboard.checker.isMoveForward() ||
            keyboard.checker.isMoveBackward() ||
            keyboard.checker.isTurnLeft() ||
            keyboard.checker.isTurnRight()
        ) {
            return new MovingBikeState(this.gameObject, this.world);
        }
    
        return undefined;
    }
}