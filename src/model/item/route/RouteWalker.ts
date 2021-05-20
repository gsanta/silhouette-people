import { Vector3 } from "babylonjs";
import { GraphEdge, GraphVertex } from "../../../service/graph/GraphImpl";
import { RouteItem } from "./RouteItem";

export enum RouteWalkerState {
    FINISHED = 'FINISHED',
    STARTED = 'STARTED'
}

export interface RouteWalker {
    getRoute(): RouteItem;

    getPos(): Vector3;
    getPrevPos(): Vector3;
    
    getEdge(): GraphEdge;
    setEdge(edge: GraphEdge): void;
    getTarget(): GraphVertex;
    getSource(): GraphVertex;
    
    walk(deltaTime: number): boolean;

    setReversed(isReversed: boolean): void;
    isReversed(): boolean;

    setState(state: RouteWalkerState): void;
    getState(): RouteWalkerState;
}