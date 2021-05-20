import { Vector2 } from "babylonjs";
import { Vector3 } from "babylonjs/Maths/math.vector";
import { GraphEdge, GraphImpl, GraphVertex } from "../../../service/graph/GraphImpl";
import { RouteItem } from "./RouteItem";
import { RouteWalker, RouteWalkerState } from "./RouteWalker";

export class RouteWalkerImpl implements RouteWalker {
    private readonly route: RouteItem;
    private readonly graph: GraphImpl;

    private prevDestPoint: GraphVertex;
    private currDestPoint: GraphVertex;
    
    private prevPos: Vector3;
    private currPos: Vector3;

    private edge: GraphEdge;

    private state: RouteWalkerState;
    private reversed: boolean = false;

    constructor(route: RouteItem, graph: GraphImpl) {
        this.route = route;
        this.graph = graph;
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
        if (this.currDestPoint && this.prevDestPoint) {
            return this.graph.edgeBetween(this.currDestPoint, this.prevDestPoint);
        }
    }

    getTarget() {
        return this.edge.getTraget(this.isReversed());
    }

    getSource() {
        return this.edge.getSource(this.isReversed());
    }

    setDestPoint(currDestPoint: GraphVertex, prevDestPoint?: GraphVertex) {
        this.prevDestPoint = prevDestPoint ? prevDestPoint : this.currDestPoint;
        this.currDestPoint = currDestPoint;
        if (currDestPoint === undefined) {
            this.setState(RouteWalkerState.FINISHED);
        } else {
            if (this.state === RouteWalkerState.FINISHED) {
                this.setState(RouteWalkerState.STARTED);
            }
        }
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
    }

    isReversed(): boolean {
        return this.reversed;
    }

    setState(state: RouteWalkerState): void {
        this.state = state;

        if (this.state === RouteWalkerState.STARTED) {
            const character = this.route.character;
            character.setPosition2D(new Vector2(this.prevDestPoint.p.x, this.prevDestPoint.p.z));
        } else {
            const { character } = this.route;
            character.walker.setSpeed(0);
        }
    }

    getState(): RouteWalkerState {
        return this.state;
    }
}