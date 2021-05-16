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
        this.setDestPoint(this.prevDestPoint, this.currDestPoint)
        // const currDestPoint = this.currDestPoint;
        // this.currDestPoint = this.prevDestPoint;
        // this.prevDestPoint = currDestPoint;
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