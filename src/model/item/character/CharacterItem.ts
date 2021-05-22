import { BikeWalker } from "../bike/states/BikeWalker";
import { MeshInputManager } from "../../MeshInputManager";
import { MeshState } from "../mesh/MeshState";
import { MeshWalker } from "../mesh/MeshWalker";
import { MeshItem } from "../mesh/MeshItem";
import { RouteWalker } from "../route/RouteWalker";
import { BikeState } from "../bike/BikeState";

export type PersonItem = CharacterItem<MeshWalker>;
export type BikeItem = CharacterItem<BikeWalker, BikeState>

export class CharacterItem<W extends MeshWalker = MeshWalker, S extends MeshState = MeshState> extends MeshItem {
    animationState: S;
    walker: W;
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