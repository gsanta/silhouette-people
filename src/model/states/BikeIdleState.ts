import { Lookup } from "../../services/Lookup";
import { GameObj } from "../objs/GameObj";
import { AbstractGameObjState, GameObjStateName } from "./AbstractGameObjState";
import { BikeMovingState } from "./BikeMovingState";

export class BikeIdleState extends AbstractGameObjState {
    private world: Lookup;

    constructor(gameObject: GameObj, world: Lookup) {
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