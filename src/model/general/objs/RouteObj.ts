import { Vector3 } from "babylonjs/Maths/math.vector";
import { CharacterObj } from "./CharacterObj";
import { Path } from "./Path";
import { RouteWalker } from "./RouteWalker";

export class RouteObj {
    readonly character: CharacterObj;
    walker: RouteWalker;

    pathes: Path[] = [];

    constructor(character: CharacterObj, pathes: Path[]) {
        this.character = character;
        this.pathes = pathes;
    }

    addPath(path: Path) {
        this.pathes.push(path);
    }

    removePath(path: Path) {
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
    
    getPathes(): Path[] {
        return this.pathes;
    }

    dispose() {
        this.pathes.forEach(path => path.dispose());
    }
}