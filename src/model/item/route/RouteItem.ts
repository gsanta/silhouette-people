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

    path: PathItem;

    constructor(path: PathItem, name?: string, character?: CharacterItem) {
        this.character = character;
        this.path = path;

        this.name = name;
    }

    addPath(path: PathItem) {
        // this.pathes.push(path);
    }

    addPoint(point: Vector3) {
        this.path.addPoint(point);
    }

    removeLastPoint() {
        const numPoints = this.path.getPoints().length;
        this.path.removePointAtIndex(numPoints - 1);
    }

    getRoutePoints() {
        return this.path.getPoints();
    }
    
    dispose() {
        this.path.dispose();
    }
}