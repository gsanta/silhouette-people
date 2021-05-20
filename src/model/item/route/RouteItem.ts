import { Mesh } from "babylonjs";
import { GraphVertex } from "../../../service/graph/GraphImpl";
import { CharacterItem } from "../character/CharacterItem";
import { RouteWalker } from "./RouteWalker";

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
    meshes: Mesh[] = [];
    private reversePoints: GraphVertex[];

    constructor(points: GraphVertex[], name?: string, character?: CharacterItem) {
        this.character = character;
        this.points = points;

        this.name = name;
        this.reversePoints = [...this.points].reverse();
    }

    addPoint(point: GraphVertex) {
        if (this.walker.isReversed()) {
            this.points.unshift(point);
        } else {
            this.points.push(point);
        }
        this.reversePoints = [...this.points].reverse();
    }

    removeFirstPoint() {
        if (this.walker.isReversed()) {
            this.points.pop();
        } else {
            this.points.shift();
        }
        this.reversePoints = [...this.points].reverse();
    }

    getRoutePoints(): GraphVertex[] {
        return this.walker.isReversed() ? this.reversePoints : this.points;
    }
    
    dispose() {}
}