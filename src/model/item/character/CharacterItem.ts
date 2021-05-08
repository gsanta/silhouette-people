import { BikeWalker } from "../bike/states/BikeWalker";
import { MeshInputManager } from "../../MeshInputManager";
import { MeshState } from "../mesh/MeshState";
import { MeshWalker } from "../mesh/MeshWalker";
import { MeshItem } from "../mesh/MeshItem";

export type PersonItem = CharacterItem<MeshWalker>;
export type BikeItem = CharacterItem<BikeWalker>

export class CharacterItem<W extends MeshWalker = MeshWalker> extends MeshItem {
    animationState: MeshState;
    walker: W;
    inputManager: MeshInputManager;
}