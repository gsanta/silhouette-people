import { Vector3 } from "babylonjs/Maths/math.vector";
import { GraphEdge } from "../../../service/graph/GraphImpl";
import { CharacterItem } from "../character/CharacterItem";
import { RouteItem } from "./RouteItem";
import { RouteWalker } from "./RouteWalker";

export class RouteWalkerImpl implements RouteWalker {
    private readonly character: CharacterItem;
    private route: RouteItem;

    private prevPos: Vector3;
    private currPos: Vector3;

    private edge: GraphEdge;

    private started = false;

    constructor(route: RouteItem, character: CharacterItem) {
        this.route = route;
        this.character = character;
    }

    getRoute(): RouteItem {
        return this.route;
    }

    setRoute(route: RouteItem): void {
        this.route = route;
    }

    getCharacter(): CharacterItem {
        return this.character;
    }

    getPos(): Vector3 {
        return this.currPos;
    }

    getPrevPos(): Vector3 {
        return this.prevPos;
    }

    getEdge(): GraphEdge {
        return this.edge;
    }

    setEdge(edge: GraphEdge): void {
        this.edge = edge;
    }

    getTarget() {
        return this.edge && this.edge.getTraget(this.route.isReversed(this.edge));
    }

    getSource() {
        return this.edge && this.edge.getSource(this.route.isReversed(this.edge));
    }

    walk(): boolean {
        if (this.started && this.edge) {
            this.prevPos = this.currPos;
            this.currPos = this.character.position;
            return true;
        }
        return false;
    }

    reverseRoute() {
        this.route = this.route.reverse();

        if (!this.edge) {
            this.edge = this.route.getEdges()[0];
        }
    }

    setStarted(isStarted: boolean): void {
        this.started = isStarted;
    }

    isStarted(): boolean {
        return this.started;
    }

    isRunning(): boolean {
        return this.isStarted() && this.edge !== undefined;
    }
}