import { AbstractGameObjState } from "../../model/states/AbstractGameObjState";
import { World } from "../../services/World";

export class StateHandler {
    private readonly world: World;
    startState: AbstractGameObjState;
    currState: AbstractGameObjState;

    constructor(startState: AbstractGameObjState, world: World) {
        this.world = world;
        this.startState = startState;
        this.currState = startState;
    }
    
    setDefaultState() {
        this.transitionState(this.startState);
    }

    update() {
        const state = this.currState;
        let newState: AbstractGameObjState = undefined;

        if (state) {
            newState = state.updateInput();
            this.transitionState(newState);
            if (!newState) {
                state.updateAnimation();
                newState = state.updatePhysics();
                this.transitionState(newState);
            }
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