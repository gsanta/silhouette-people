import { Vector3 } from "babylonjs";
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
    
    setDestPoint(currDestPoint: Vector3, prevDestPoint?: Vector3);
    getDestPoint(): Vector3;
    getPrevDestPoint(): Vector3;
    
    walk(deltaTime: number): boolean;

    setDirection(direction: RouteWalkerDirection): void;
    getDirection(): RouteWalkerDirection;

    setState(state: RouteWalkerState): void;
    getState(): RouteWalkerState;
}