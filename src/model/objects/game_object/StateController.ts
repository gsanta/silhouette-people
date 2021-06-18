import { MonoBehaviour } from "../../behaviours/MonoBehaviour";
import { MonoBehaviourName } from "../../behaviours/MonoBehaviourName";
import { GameObjectState } from "./GameObjectState";


export class StateController extends MonoBehaviour {
    private _state: GameObjectState;

    constructor() {
        super(MonoBehaviourName.STATE_CONTROLLER);
    }

    get state(): GameObjectState {
        return this._state;
    }

    set state(state: GameObjectState) {
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