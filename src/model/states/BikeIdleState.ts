import { World } from "../../services/World";
import { GameObj } from "../objs/GameObj";
import { AbstractGameObjState, GameObjStateName } from "./AbstractGameObjState";
import { BikeMovingState } from "./BikeMovingState";

export class BikeIdleState extends AbstractGameObjState {
    private world: World;

    constructor(gameObject: GameObj, world: World) {
        super(GameObjStateName.BikeIdleState, gameObject);
        this.world = world;
    }

    keyboard(e: KeyboardEvent) {
        if (!this.gameObject.tag.isPlayer()) { return undefined; }
    
        const keyboard = this.world.keyboard;
    
        if (
            keyboard.checker.isMoveForward() ||
            keyboard.checker.isMoveBackward() ||
            keyboard.checker.isTurnLeft() ||
            keyboard.checker.isTurnRight()
        ) {
            this.gameObject.state.setState(new BikeMovingState(this.gameObject, this.world));
        }
    }
}