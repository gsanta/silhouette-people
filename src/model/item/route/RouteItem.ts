import { Vector3 } from "babylonjs/Maths/math.vector";
import { CharacterItem } from "../character/CharacterItem";
import { PathItem } from "../PathItem";
import { RouteWalker } from "./RouteWalker";

export class RouteItem {
    character: CharacterItem;
    walker: RouteWalker;

    pathes: PathItem[] = [];

    constructor(pathes: PathItem[], character?: CharacterItem) {
        this.character = character;
        this.pathes = pathes;
    }

    addPath(path: PathItem) {
        this.pathes.push(path);
    }

    removePath(path: PathItem) {
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
    
    getPathes(): PathItem[] {
        return this.pathes;
    }

    dispose() {
        this.pathes.forEach(path => path.dispose());
    }
}