import { Vector2 } from "babylonjs";
import { CharacterObj } from "./CharacterObj";
import { RouteWalker } from "./RouteWalker";

export class RouteObj {
    readonly checkPoints: Vector2[];
    readonly character: CharacterObj;
    walker: RouteWalker;

    constructor(character: CharacterObj, checkPoints: Vector2[]) {
        this.character = character;
        this.checkPoints = checkPoints;
    }
}