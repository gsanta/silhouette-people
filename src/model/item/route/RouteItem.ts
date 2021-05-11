import { Vector3 } from "babylonjs/Maths/math.vector";
import { CharacterItem } from "../character/CharacterItem";
import { PathItem } from "../PathItem";
import { RouteWalker } from "./RouteWalker";

export interface RouteStoryConfig {
    routeId: string;
    characterId: string;
}


export class RouteItem {
    readonly name: string;
    character: CharacterItem;
    walker: RouteWalker;

    pathes: PathItem[] = [];

    constructor(pathes: PathItem[], name?: string, character?: CharacterItem) {
        this.character = character;
        this.pathes = pathes;

        this.name = name;
    }

    addPath(path: PathItem) {
        this.pathes.push(path);
    }

    removePath(path: PathItem) {
        this.pathes = this.pathes.filter(p => p !== path);
    }

    getCheckpoints() {
        const points: Vector3[] = [];

        points.push(...this.pathes[0].getPoints());

        for (let i = 1; i < this.pathes.length; i++) {
            const [first, ...rest] = this.pathes[i].getPoints();
            points.push(...rest);
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