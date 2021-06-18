import { MonoBehaviour } from "../../../behaviours/MonoBehaviour";
import { MonoBehaviourName } from "../../../behaviours/MonoBehaviourName";
import { MeshState } from "../../../item/mesh/MeshState";


export class StateController extends MonoBehaviour {
    private _state: MeshState;

    constructor() {
        super(MonoBehaviourName.STATE_CONTROLLER);
    }

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

    update(deltaTime: number) {
        this.state.update(deltaTime);
    }
}