import { Vector2 } from "babylonjs";
import { Vector3 } from "babylonjs/Maths/math.vector";
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
    
    private checkpointUpdater: CheckpointUpdater;
    private readonly routePointProvider: RoutePointProvider;

    private lockedFeatures: LockedFeature[] = [];
    private onFinishedFuncs: (() => void)[] = [];    

    constructor(route: RouteItem, routePointProvider: RoutePointProvider = new StaticRoutePointProvider()) {
        this.route = route;
        this.routePointProvider = routePointProvider;
        this.routePointProvider.setRoute(this.route);
        this.checkpointUpdater = new CheckpointUpdater(this, this.route, this.routePointProvider);
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

class CheckpointUpdater {
    private readonly routeWalker: RouteWalkerImpl;
    private readonly route: RouteItem;
    private readonly routePointProvider: RoutePointProvider;
    
    constructor(routeWalker: RouteWalkerImpl, route: RouteItem, routePointProvider: RoutePointProvider) {
        this.routeWalker = routeWalker;
        this.route = route;
        this.routePointProvider = routePointProvider;
    }

    initCheckPoints() {
        const route = this.route;

        const routePoints = route.getRoutePoints();
        this.routeWalker.setDestPoint(routePoints[1], routePoints[0]);
    }
    
    updateCheckPointsIfNeeded() {
        if (this.isCheckPointReached()) {
            this.setNextCheckPoint();
            return true;
        }
    }

    private setNextCheckPoint() {
        const route = this.route
        const character = route.character;
        const destPoint = this.routeWalker.getDestPoint();
        const prevDestPoint = this.routeWalker.getPrevDestPoint();

        const nextDestPoint = this.routePointProvider.getNextRoutePoint(destPoint, prevDestPoint);

        if (nextDestPoint === undefined) {
            this.routeWalker.setFinished(true);
        } else {
            this.routeWalker.setDestPoint(nextDestPoint, character.getPosition());
        }
    }

    private isCheckPointReached() {
        const destPoint = this.routeWalker.getDestPoint();
        const route = this.route
        const character = route.character;
        
        const curr = character.getPosition();
    
        const isWithinDestRadius = destPoint.subtract(curr).length() < 0.2;
        const isLeavingDest = this.isLeavingDest();
    
        return isWithinDestRadius || isLeavingDest;
    }

    private isLeavingDest() {
        const currPos = this.routeWalker.getCurrPos();
        const prevPos = this.routeWalker.getPrevPos();
        const destPoint = this.routeWalker.getDestPoint();

        if (prevPos) {
            const checkDist = prevPos.subtract(destPoint).length() < 2;
            const checkDir = prevPos.subtract(destPoint).length() < currPos.subtract(destPoint).length();
            return checkDist && checkDir;
        }
        return false;
    }
}