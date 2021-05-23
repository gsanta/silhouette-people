import { MeshInputManager } from "../../MeshInputManager";
import { MeshState } from "../mesh/MeshState";
import { MeshMover } from "../mesh/MeshMover";
import { MeshItem } from "../mesh/MeshItem";
import { RouteWalker } from "../route/RouteWalker";
import { BikeState, BikeStateInfo } from "../bike/BikeState";

export type PersonItem = CharacterItem;
export type BikeItem = CharacterItem<BikeState, BikeStateInfo>

export class CharacterItem<S extends MeshState = MeshState, I = any> extends MeshItem {
    animationState: S;
    mover: MeshMover;
    inputManager: MeshInputManager;
    routeWalker: RouteWalker;
    info: I;

    setState(state: S) {
        if (this.animationState) {
            this.animationState.exitState();
        }

        this.animationState = state;

        if (this.animationState) {
            this.animationState.enterState();
        }
    }
}