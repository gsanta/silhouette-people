import { BikeWalker } from "../../bike/BikeWalker";
import { MeshState } from "../state/MeshState";
import { MeshWalker } from "../state/MeshWalker";
import { MeshObj } from "./MeshObj";

export type HumanoidObj = CharacterObj<MeshWalker>;
export type BikeObj = CharacterObj<BikeWalker>

export class CharacterObj<W extends MeshWalker = MeshWalker> extends MeshObj {
    animationState: MeshState;
    walker: W;
}