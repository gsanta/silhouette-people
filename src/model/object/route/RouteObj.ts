import { Vector3 } from "babylonjs/Maths/math.vector";
import { CharacterObj } from "../character/CharacterObj";
import { PathObj } from "../PathObj";
import { RouteWalker } from "./RouteWalker";

export class RouteObj {
    readonly character: CharacterObj;
    walker: RouteWalker;

    pathes: PathObj[] = [];

    constructor(character: CharacterObj, pathes: PathObj[]) {
        this.character = character;
        this.pathes = pathes;
    }

    addPath(path: PathObj) {
        this.pathes.push(path);
    }

    removePath(path: PathObj) {
        this.pathes = this.pathes.filter(p => p !== path);
    }

    getCheckpoints() {
        const points: Vector3[] = [];

        points.push(this.pathes[0].getStartPoint(), this.pathes[0].getEndPoint());

        for (let i = 1; i < this.pathes.length; i++) {
            points.push(this.pathes[i].getEndPoint());
        }

        return points;
    }
    
    getPathes(): PathObj[] {
        return this.pathes;
    }

    dispose() {
        this.pathes.forEach(path => path.dispose());
    }
}