import { Vector3 } from "babylonjs";
import { GraphVertex } from "../../../service/graph/GraphImpl";
import { RouteItem } from "./RouteItem";

export enum RouteWalkerDirection {
    FORWARD = 'FORWARD',
    BACKWARD = 'BACKWARD'
}

export enum RouteWalkerState {
    FINISHED = 'FINISHED',
    STARTED = 'STARTED'
}

export interface RouteWalker {
    getRoute(): RouteItem;

    getCurrPos(): Vector3;
    getPrevPos(): Vector3;
    
    setDestPoint(currDestPoint: GraphVertex, prevDestPoint?: GraphVertex);
    getDestPoint(): GraphVertex;
    getPrevDestPoint(): GraphVertex;
    
    walk(deltaTime: number): boolean;

    setDirection(direction: RouteWalkerDirection): void;
    getDirection(): RouteWalkerDirection;

    setState(state: RouteWalkerState): void;
    getState(): RouteWalkerState;
}