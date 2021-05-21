import { Vector3 } from "babylonjs/Maths/math.vector";
import { GraphEdge } from "../../../service/graph/GraphImpl";
import { RouteItem } from "./RouteItem";
import { RouteWalker } from "./RouteWalker";

export class RouteWalkerImpl implements RouteWalker {
    private readonly route: RouteItem;

    private prevPos: Vector3;
    private currPos: Vector3;

    private edge: GraphEdge;

    private started = false;
    private reversed = false;

    constructor(route: RouteItem) {
        this.route = route;
    }

    getRoute(): RouteItem {
        return this.route;
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
            const character = this.route.character;
        
            this.prevPos = this.currPos;
            this.currPos = character.getPosition();
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