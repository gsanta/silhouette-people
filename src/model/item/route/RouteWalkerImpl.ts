import { Vector3 } from "babylonjs/Maths/math.vector";
import { GraphEdge } from "../../../service/graph/GraphImpl";
import { CharacterItem } from "../character/CharacterItem";
import { RouteItem } from "./RouteItem";
import { RouteWalker } from "./RouteWalker";

export class RouteWalkerImpl implements RouteWalker {
    private readonly character: CharacterItem;
    private route: RouteItem;
    private routeReversed: RouteItem;

    private prevPos: Vector3;
    private currPos: Vector3;

    private edge: GraphEdge;

    private started = false;
    private reversed = false;

    constructor(route: RouteItem, character: CharacterItem) {
        this.route = route;
        this.routeReversed = route.reverse();
        this.character = character;
    }

    getRoute(): RouteItem {
        return this.isReversed() ? this.routeReversed : this.route;
    }

    setRoute(route: RouteItem): void {
        if (this.isReversed()) {
            this.routeReversed = route;
            this.route = route.reverse();
        } else {
            this.route = route;
            this.routeReversed = route.reverse();
        }
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
        return this.edge && this.edge.getTraget(this.isReversed());
    }

    getSource() {
        return this.edge && this.edge.getSource(this.isReversed());
    }

    walk(): boolean {
        if (this.started && this.edge) {
            this.prevPos = this.currPos;
            this.currPos = this.character.getPosition();
            return true;
        }
        return false;
    }

    setReversed(isReversed: boolean) {
        this.reversed = isReversed;

        if (!this.edge) {
            this.edge = this.route.getEdges()[0];
        }
    }

    isReversed(): boolean {
        return this.reversed;
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