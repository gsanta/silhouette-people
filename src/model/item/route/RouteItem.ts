import { Vector3 } from "babylonjs/Maths/math.vector";
import { CharacterItem } from "../character/CharacterItem";
import { PathItem } from "../PathItem";
import { RouteWalker, RouteWalkerDirection } from "./RouteWalker";

export interface RouteStoryConfig {
    routeId: string;
    characterId: string;
}

export class RouteItem {
    readonly name: string;
    character: CharacterItem;
    walker: RouteWalker;

    path: PathItem;
    private reverseDirection: Vector3[];

    constructor(path: PathItem, name?: string, character?: CharacterItem) {
        this.character = character;
        this.path = path;

        this.name = name;
        this.reverseDirection = [...this.path.getPoints()].reverse();
    }

    addPoint(point: Vector3) {
        if (this.walker.getDirection() === RouteWalkerDirection.FORWARD) {
            this.path.addPointLast(point);
        } else {
            this.path.addPointFirst(point);
        }

    }

    removeFirstPoint() {
        if (this.walker.getDirection() === RouteWalkerDirection.FORWARD) {
            this.path.removePointFirst();
        } else {
            this.path.removePointLast();
        }
        this.reverseDirection = [...this.path.getPoints()].reverse();
    }

    getRoutePoints(): Vector3[] {
        return this.walker.getDirection() === RouteWalkerDirection.FORWARD ? this.path.getPoints() : this.reverseDirection;
    }
    
    dispose() {
        this.path.dispose();
    }
}