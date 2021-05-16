import { GraphVertex } from "../../../service/graph/GraphImpl";
import { CharacterItem } from "../character/CharacterItem";
import { RouteWalker, RouteWalkerDirection } from "./RouteWalker";

export interface RouteStoryConfig {
    routeId: string;
    characterId: string;
}

export class RouteItem {
    readonly name: string;
    character: CharacterItem;
    walker: RouteWalker;

    // path: PathItem;
    points: GraphVertex[];
    private reversePoints: GraphVertex[];

    constructor(points: GraphVertex[], name?: string, character?: CharacterItem) {
        this.character = character;
        this.points = points;

        this.name = name;
        this.reversePoints = [...this.points].reverse();
    }

    addPoint(point: GraphVertex) {
        if (this.walker.getDirection() === RouteWalkerDirection.FORWARD) {
            this.points.push(point);
        } else {
            this.points.unshift(point);
        }
        this.reversePoints = [...this.points].reverse();
    }

    removeFirstPoint() {
        if (this.walker.getDirection() === RouteWalkerDirection.FORWARD) {
            this.points.shift();
        } else {
            this.points.pop();
        }
        this.reversePoints = [...this.points].reverse();
    }

    getRoutePoints(): GraphVertex[] {
        return this.walker.getDirection() === RouteWalkerDirection.FORWARD ? this.points : this.reversePoints;
    }
    
    dispose() {}
}