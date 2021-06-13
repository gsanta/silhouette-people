import { MeshState } from "../../mesh/MeshState";


export class StateController {
    private _state: MeshState;

    get state(): MeshState {
        return this._state;
    }

    set state(state: MeshState) {
        if (this.state) {
            this.state.exitState();
        }

        this._state = state;

        if (this.state) {
            this.state.enterState();
        }
    }
}