import { Vector3 } from "babylonjs";
import { GraphEdge, GraphVertex } from "../../../service/graph/GraphImpl";
import { RouteItem } from "./RouteItem";

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
    getCurrEdge(): GraphEdge;
    
    walk(deltaTime: number): boolean;

    setReversed(isReversed: boolean): void;
    isReversed(): boolean;

    setState(state: RouteWalkerState): void;
    getState(): RouteWalkerState;
}