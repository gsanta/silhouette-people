import { Vector3 } from "babylonjs";
import { Quad } from "../shapes/Quad";
import { PathShape } from "./PathShape";


export class CurvedPathShape implements PathShape {

    constructor() {
        
    }

    get path(): Vector3[][] {
        return null;
    }

    get bounds(): Quad {
        return null;
    }
}