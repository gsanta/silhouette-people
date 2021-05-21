import { Vector3 } from "babylonjs";
import { GraphEdge, GraphVertex } from "../../../service/graph/GraphImpl";
import { RouteItem } from "./RouteItem";

export enum RouteWalkerState {
    FINISHED = 'FINISHED',
    STARTED = 'STARTED'
}

export interface RouteWalker {
    walk(deltaTime: number): boolean;

    getRoute(): RouteItem;

    getPos(): Vector3;
    getPrevPos(): Vector3;
    
    getEdge(): GraphEdge;
    setEdge(edge: GraphEdge): void;
    getTarget(): GraphVertex;
    getSource(): GraphVertex;
    
    setReversed(isReversed: boolean): void;
    isReversed(): boolean;

    setStarted(isStarted: boolean): void;
    isStarted(): boolean;
    isRunning(): boolean;
}