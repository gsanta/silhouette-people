import { MeshInputManager } from "../../MeshInputManager";
import { MeshState } from "../mesh/MeshState";
import { MeshMover } from "../mesh/MeshMover";
import { MeshItem } from "../mesh/MeshItem";
import { RouteWalker } from "../route/RouteWalker";
import { BikeState } from "../bike/BikeState";

export type PersonItem = CharacterItem;
export type BikeItem = CharacterItem<BikeState>

export class CharacterItem<S extends MeshState = MeshState> extends MeshItem {
    animationState: S;
    mover: MeshMover;
    inputManager: MeshInputManager;
    routeWalker: RouteWalker;

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