import { Lookup } from "../../services/Lookup";
import { MeshObj } from "../objs/MeshObj";
import { AbstractMeshObjState, MeshObjStateName } from "./AbstractMeshObjState";
import { BikeMovingState } from "./BikeMovingState";

export class BikeIdleState extends AbstractMeshObjState {
    private world: Lookup;

    constructor(gameObject: MeshObj, world: Lookup) {
        super(MeshObjStateName.BikeIdleState, gameObject);
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