import { BikeWalker } from "../bike/states/BikeWalker";
import { MeshInputManager } from "../../MeshInputManager";
import { MeshState } from "../mesh/MeshState";
import { MeshWalker } from "../mesh/MeshWalker";
import { MeshObj } from "../mesh/MeshObj";

export type HumanoidObj = CharacterObj<MeshWalker>;
export type BikeObj = CharacterObj<BikeWalker>

export class CharacterObj<W extends MeshWalker = MeshWalker> extends MeshObj {
    animationState: MeshState;
    walker: W;
    inputManager: MeshInputManager;
}