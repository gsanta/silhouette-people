import { Vector2 } from "babylonjs";
import { Vector3 } from "babylonjs/Maths/math.vector";
import { DestinationPointUpdater } from "./DestinationPointUpdater";
import { LockedFeature } from "./features/LockedFeature";
import { RouteItem } from "./RouteItem";
import { RoutePointProvider } from "./RoutepointProvider";
import { RouteWalker } from "./RouteWalker";
import { StaticRoutePointProvider } from "./StaticRoutePointProvider";

export class RouteWalkerImpl implements RouteWalker {
    private readonly route: RouteItem;
    
    private prevDestPoint: Vector3;
    private currDestPoint: Vector3;
    
    private prevPos: Vector3;
    private currPos: Vector3;
    private _isStarted = false;
    private _isFinished: boolean = false;
    
    private checkpointUpdater: DestinationPointUpdater;

    private lockedFeatures: LockedFeature[] = [];
    private onFinishedFuncs: (() => void)[] = [];    

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

    setDestPoint(currDestPoint: Vector3, prevDestPoint?: Vector3) {
        this.prevDestPoint = prevDestPoint ? prevDestPoint : this.currDestPoint;
        this.currDestPoint = currDestPoint;
    }

    getDestPoint(): Vector3 {
        return this.currDestPoint;
    }

    getPrevDestPoint(): Vector3 {
        return this.prevDestPoint;
    }

    walk(deltaTime: number): boolean {
        if (!this._isStarted || this._isFinished) { return false; }

        const character = this.route.character;
    
        this.prevPos = this.currPos;
        this.currPos = character.getPosition();    
        this.lockedFeatures.forEach(lockedFeature => lockedFeature.update(deltaTime));
        this.checkpointUpdater.updateCheckPointsIfNeeded();
    }

    addFeature(lockedFeature: LockedFeature) {
        this.lockedFeatures.push(lockedFeature);
    }

    isFinished(): boolean {
        return this._isFinished;
    }

    isStarted(): boolean {
        return this._isStarted;
    }

    onFinished(func: () => void) {
        this.onFinishedFuncs.push(func);
    }

    setStarted() {
        this._isStarted = true;

        this.checkpointUpdater.initCheckPoints();
        const character = this.route.character;
        character.setPosition2D(new Vector2(this.prevDestPoint.x, this.prevDestPoint.z));

        this.lockedFeatures.forEach(feature => feature.enableFeature());
    }

    setFinished(isFinished) {
        this._isFinished = isFinished;
        
        if (isFinished) {
            const { character } = this.route;
            character.walker.setSpeed(0);
        }

        this.lockedFeatures.forEach(feature => feature.disableFeature());
        this.onFinishedFuncs.forEach(func => func());
    }
}