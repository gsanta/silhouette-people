import { AbstractMeshState } from "../states/AbstractMeshState";

export class StateComponent {
    startState: AbstractMeshState;
    currState: AbstractMeshState;

    constructor(startState: AbstractMeshState) {
        this.startState = startState;
        this.currState = startState;

        if (this.currState) {
            this.currState.enterState();
        }
    }

    keyboard(e: KeyboardEvent, isKeydown: boolean) {
        if (!this.currState) { return; }
        this.currState.keyboard(e, isKeydown);
    }
    
    setDefaultState() {
        this.transitionState(this.startState);
    }

    setState(state: AbstractMeshState) {
        this.transitionState(state);
    }

    update() {
        if (this.currState) {
            this.currState.beforeRender();
        }
    }

    private transitionState(newState: AbstractMeshState) {
        if (!newState || this.currState == newState) { return; }

        if (this.currState) {
            this.currState.exitState();
        }
        this.currState = newState;
        this.currState.enterState();
    }
}