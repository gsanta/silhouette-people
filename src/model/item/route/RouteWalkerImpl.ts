import { Vector2 } from "babylonjs";
import { Vector3 } from "babylonjs/Maths/math.vector";
import { GraphVertex } from "../../../service/graph/GraphImpl";
import { RouteItem } from "./RouteItem";
import { RouteWalker, RouteWalkerDirection, RouteWalkerState } from "./RouteWalker";

export class RouteWalkerImpl implements RouteWalker {
    private readonly route: RouteItem;
    
    private prevDestPoint: GraphVertex;
    private currDestPoint: GraphVertex;
    
    private prevPos: Vector3;
    private currPos: Vector3;

    private direction: RouteWalkerDirection = RouteWalkerDirection.FORWARD;
    private state: RouteWalkerState;

    constructor(route: RouteItem) {
        this.route = route;
    }

    getRoute(): RouteItem {
        return this.route;
    }

    getCurrPos(): Vector3 {
        return this.currPos;
    }

    getPrevPos(): Vector3 {
        return this.prevPos;
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

    getDestPoint(): GraphVertex {
        return this.currDestPoint;
    }

    getPrevDestPoint(): GraphVertex {
        return this.prevDestPoint;
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

    setDirection(direction: RouteWalkerDirection): void {
        this.direction = direction;

        if (!this.currDestPoint) {
            const points = this.route.getRoutePoints();
            this.setDestPoint(points[1], points[0]);
        } else {
            this.setDestPoint(this.prevDestPoint, this.currDestPoint)
        }
    }
    
    getDirection(): RouteWalkerDirection {
        return this.direction;
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