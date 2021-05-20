import { Vector3 } from "babylonjs";
import { GraphEdge, GraphVertex } from "../../../service/graph/GraphImpl";
import { RouteWalker, RouteWalkerState } from "./RouteWalker";
import { RouteWalkerImpl } from "./RouteWalkerImpl";
import { RouteWalkerListener } from "./RouteWalkerListener";

export class RouteWalkerListenerDecorator implements RouteWalker {

    private delegate: RouteWalkerImpl;
    private listeners: RouteWalkerListener[] = [];

    constructor(delegate: RouteWalkerImpl) {
        this.delegate = delegate;
    }

    setDestPoint(currDestPoint: GraphVertex, prevDestPoint?: GraphVertex): void {
        this.delegate.setDestPoint(currDestPoint, prevDestPoint);
        this.listeners.forEach(listener => listener.onEnterEdge());
    }

    walk(deltaTime: number): boolean {
        const ret = this.delegate.walk();
        if (ret && this.getState() !== RouteWalkerState.FINISHED) {
            this.listeners.forEach(listener => listener.onWalk(deltaTime));
        }
        return ret;
    }

    setState(state: RouteWalkerState): void {
        if (state === RouteWalkerState.STARTED) {
            this.listeners.forEach(listener => listener.onStarted());
        } else if (state === RouteWalkerState.FINISHED) {
            this.listeners.forEach(listener => listener.onFinished());
        }

        this.delegate.setState(state);

    }

    setReversed(isReversed: boolean): void { 
        this.delegate.setReversed(isReversed);

        this.listeners.forEach(listener => listener.onDirectionChanged());
        this.listeners.forEach(listener => listener.onEnterEdge());
    }
    isReversed(): boolean { return this.delegate.isReversed(); }
    getState(): RouteWalkerState { return this.delegate.getState(); }
    getCurrPos(): Vector3 { return this.delegate.getCurrPos(); }
    getPrevPos(): Vector3 { return this.delegate.getPrevPos(); }
    getDestPoint(): GraphVertex { return this.delegate.getDestPoint(); }
    getPrevDestPoint(): GraphVertex { return this.delegate.getPrevDestPoint(); }
    getCurrEdge(): GraphEdge { return this.delegate.getCurrEdge(); }
    getRoute() { return this.delegate.getRoute() }

    addListener(routeWalkerListener: RouteWalkerListener) {
        this.listeners.push(routeWalkerListener);
    }
}
