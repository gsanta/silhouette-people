import { Vector2 } from "babylonjs";
import { Vector3 } from "babylonjs/Maths/math.vector";
import { GraphEdge } from "../../../service/graph/GraphImpl";
import { RouteItem } from "./RouteItem";
import { RouteWalker, RouteWalkerState } from "./RouteWalker";

export class RouteWalkerImpl implements RouteWalker {
    private readonly route: RouteItem;

    private prevPos: Vector3;
    private currPos: Vector3;

    private edge: GraphEdge;

    private state: RouteWalkerState;
    private reversed: boolean = false;

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

        if (this.edge === undefined) {
            this.setState(RouteWalkerState.FINISHED);
        } else {
            if (this.state === RouteWalkerState.FINISHED) {
                this.setState(RouteWalkerState.STARTED);
            }
        }
    }

    getTarget() {
        return this.edge && this.edge.getTraget(this.isReversed());
    }

    getSource() {
        return this.edge && this.edge.getSource(this.isReversed());
    }

    walk(): boolean {
        if (this.state === RouteWalkerState.STARTED) {
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
            this.state = RouteWalkerState.STARTED;
        }
    }

    isReversed(): boolean {
        return this.reversed;
    }

    setState(state: RouteWalkerState): void {
        this.state = state;

        if (this.state === RouteWalkerState.STARTED) {
            const character = this.route.character;
            const source = this.getSource().p;
            character.setPosition2D(new Vector2(source.x, source.z));
        } else {
            const { character } = this.route;
            character.walker.setSpeed(0);
        }
    }

    getState(): RouteWalkerState {
        return this.state;
    }
}