import { AbstractGameObjState } from "../states/AbstractGameObjState";
import { World } from "../../services/World";

export class StateComponent {
    private readonly world: World;
    startState: AbstractGameObjState;
    currState: AbstractGameObjState;

    constructor(startState: AbstractGameObjState, world: World) {
        this.world = world;
        this.startState = startState;
        this.currState = startState;

        if (this.currState) {
            this.currState.enter();
        }
    }

    keyboard(e: KeyboardEvent, isKeydown: boolean) {
        if (!this.currState) { return; }
        this.currState.keyboard(e, isKeydown);
    }
    
    setDefaultState() {
        this.transitionState(this.startState);
    }

    setState(state: AbstractGameObjState) {
        this.transitionState(state);
    }

    update() {
        if (this.currState) {
            this.currState.update();
        }
    }

    private transitionState(newState: AbstractGameObjState) {
        if (!newState || this.currState == newState) { return; }

        if (this.currState) {
            this.currState.exit();
        }
        this.currState = newState;
        this.currState.enter();
    }
}