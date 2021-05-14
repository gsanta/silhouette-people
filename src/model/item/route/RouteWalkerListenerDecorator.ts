import { Vector3 } from "babylonjs";
import { LockedFeature } from "./features/LockedFeature";
import { RouteWalker } from "./RouteWalker";
import { RouteWalkerImpl } from "./RouteWalkerImpl";
import { RouteWalkerListener } from "./RouteWalkerListener";

export class RouteWalkerListenerDecorator implements RouteWalker {

    private delegate: RouteWalkerImpl;
    private listeners: RouteWalkerListener[] = [];

    constructor(delegate: RouteWalkerImpl) {
        this.delegate = delegate;
    }

    setDestPoint(currDestPoint: Vector3, prevDestPoint?: Vector3): void {
        this.delegate.setDestPoint(currDestPoint, prevDestPoint);
        this.listeners.forEach(listener => listener.onDestinationPointChanged());
    }

    walk(deltaTime: number): boolean {
        const ret = this.delegate.walk(deltaTime);
        if (ret) {
            this.listeners.forEach(listener => listener.onWalk(deltaTime));
        }
        return ret;
    }

    setStarted(): void {
        this.delegate.setStarted();
        this.listeners.forEach(listener => listener.onStarted());
    }

    setFinished(isFinished: any): void {
        this.delegate.setFinished(isFinished);
        if (this.isFinished()) {
            this.listeners.forEach(listener => listener.onFinished());
        }
    }

    getCurrPos(): Vector3 { return this.delegate.getCurrPos(); }
    getPrevPos(): Vector3 { return this.delegate.getPrevPos(); }
    addFeature(lockedFeature: LockedFeature): void { this.delegate.addFeature(lockedFeature); }
    getDestPoint(): Vector3 { return this.delegate.getDestPoint(); }
    getPrevDestPoint(): Vector3 { return this.delegate.getPrevDestPoint(); }
    isFinished(): boolean { return this.delegate.isFinished(); }
    isStarted(): boolean { return this.delegate.isStarted(); }
    onFinished(func: () => void): void { this.delegate.onFinished(func); }

    addListener(routeWalkerListener: RouteWalkerListener) {
        this.listeners.push(routeWalkerListener);
    }
}
