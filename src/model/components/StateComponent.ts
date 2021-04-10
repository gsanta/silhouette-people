import { AbstractMeshObjState } from "../states/AbstractMeshObjState";
import { Lookup } from "../../services/Lookup";

export class StateComponent {
    private readonly world: Lookup;
    startState: AbstractMeshObjState;
    currState: AbstractMeshObjState;

    constructor(startState: AbstractMeshObjState, world: Lookup) {
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

    setState(state: AbstractMeshObjState) {
        this.transitionState(state);
    }

    update() {
        if (this.currState) {
            this.currState.update();
        }
    }

    private transitionState(newState: AbstractMeshObjState) {
        if (!newState || this.currState == newState) { return; }

        if (this.currState) {
            this.currState.exit();
        }
        this.currState = newState;
        this.currState.enter();
    }
}