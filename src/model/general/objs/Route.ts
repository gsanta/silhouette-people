import { Vector2 } from "babylonjs";
import { Character } from "./MeshObj";
import { RouteWalker } from "./RouteWalker";

export class Route {
    readonly checkPoints: Vector2[];
    readonly character: Character;
    walker: RouteWalker;

    constructor(character: Character, checkPoints: Vector2[]) {
        this.character = character;
        this.checkPoints = checkPoints;

        if (this.checkPoints.length < 2) {
            throw new Error('A route needs to contain at least two checkpoints');
        }
    }
}