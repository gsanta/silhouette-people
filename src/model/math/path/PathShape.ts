import { Vector3 } from "babylonjs";
import { Quad } from "../shapes/Quad";

export interface PathShape {
    path: Vector3[][];
    bounds: Quad;
}