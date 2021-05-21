import { Vector3 } from "babylonjs";
import { GraphEdge, GraphVertex } from "../../../service/graph/GraphImpl";
import { RouteWalker } from "./RouteWalker";
import { RouteWalkerImpl } from "./RouteWalkerImpl";
import { RouteWalkerListener } from "./RouteWalkerListener";

export class RouteWalkerListenerDecorator implements RouteWalker {

    private delegate: RouteWalkerImpl;
    private listeners: RouteWalkerListener[] = [];

    constructor(delegate: RouteWalkerImpl) {
        this.delegate = delegate;
    }

    walk(deltaTime: number): boolean {
        const ret = this.delegate.walk();
        if (ret) {
            this.listeners.forEach(listener => listener.onWalk(deltaTime));
        }
        return ret;
    }

    setStarted(isStarted: boolean): void {
        if (isStarted) {
            this.listeners.forEach(listener => listener.onStarted());
        } else {
            this.listeners.forEach(listener => listener.onFinished());
        }

        this.delegate.setStarted(isStarted);

    }
    isStarted(): boolean { return this.delegate.isStarted(); }
    isRunning(): boolean { return this.delegate.isRunning(); }

    setReversed(isReversed: boolean): void { 
        this.delegate.setReversed(isReversed);

        this.listeners.forEach(listener => listener.onDirectionChanged());
        this.listeners.forEach(listener => listener.onEnterEdge());
    }
    isReversed(): boolean { return this.delegate.isReversed(); }
    getPos(): Vector3 { return this.delegate.getPos(); }
    getPrevPos(): Vector3 { return this.delegate.getPrevPos(); }
    getEdge(): GraphEdge { return this.delegate.getEdge(); }
    setEdge(edge: GraphEdge): void { 
        this.delegate.setEdge(edge);
        this.listeners.forEach(listener => listener.onEnterEdge());
    }
    getTarget(): GraphVertex { return this.delegate.getTarget(); }
    getSource(): GraphVertex { return this.delegate.getSource(); }
    getRoute() { return this.delegate.getRoute() }

    addListener(routeWalkerListener: RouteWalkerListener) {
        this.listeners.push(routeWalkerListener);
    }
}
