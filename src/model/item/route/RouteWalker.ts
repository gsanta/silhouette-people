import { Vector2 } from "babylonjs";
import { Vector3 } from "babylonjs/Maths/math.vector";
import { LockedFeature } from "./features/LockedFeature";
import { RouteItem } from "./RouteItem";
import { RoutePointProvider } from "./RoutepointProvider";
import { StaticRoutePointProvider } from "./StaticRoutePointProvider";

export class RouteWalker {
    readonly route: RouteItem;
    
    fromCheckPoint: Vector3;
    toCheckPoint: Vector3;
    prevPos: Vector3;
    currPos: Vector3;
    protected _isStarted = false;
    protected _isFinished: boolean = false;
    
    private checkpointUpdater: CheckpointUpdater;
    private readonly routePointProvider: RoutePointProvider;

    private lockedFeatures: LockedFeature[] = [];
    private onFinishedFuncs: (() => void)[] = [];    

    constructor(route: RouteItem, routePointProvider: RoutePointProvider = new StaticRoutePointProvider()) {
        this.route = route;
        this.routePointProvider = routePointProvider;
        this.routePointProvider.setRoute(this.route);
        this.checkpointUpdater = new CheckpointUpdater(this, this.routePointProvider);
    }

    walk(deltaTime: number): void {
        if (!this._isStarted || this._isFinished) { return; }

        const character = this.route.character;
    
        this.checkpointUpdater.updateCheckPointsIfNeeded()

        if (!this.isFinished()) {
            this.lockedFeatures.forEach(lockedFeature => lockedFeature.update(deltaTime));
            this.prevPos = this.currPos;
            this.currPos = character.getPosition();    
        }
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
        character.setPosition2D(new Vector2(this.fromCheckPoint.x, this.fromCheckPoint.z));

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
    private readonly routeWalker: RouteWalker;
    private readonly routePointProvider: RoutePointProvider;
    
    constructor(routeWalker: RouteWalker, routePointProvider: RoutePointProvider) {
        this.routeWalker = routeWalker;
        this.routePointProvider = routePointProvider;
    }

    initCheckPoints() {
        const route = this.routeWalker.route;

        const checkPoints = route.getRoutePoints();
        this.routeWalker.fromCheckPoint = checkPoints[0];
        this.routeWalker.toCheckPoint = checkPoints[1];
    }
    
    updateCheckPointsIfNeeded() {
        if (this.isCheckPointReached()) {
            this.setNextCheckPoint();
            return true;
        }
    }

    private setNextCheckPoint() {
        const route = this.routeWalker.route
        const character = route.character;
        const checkPoints = route.getRoutePoints();
        const { toCheckPoint } = this.routeWalker;

        const nextRoutePoint = this.routePointProvider.getNextRoutePoint(toCheckPoint);

        if (nextRoutePoint === undefined) {
            this.routeWalker.setFinished(true);
        } else {
            this.routeWalker.fromCheckPoint = character.getPosition();
            this.routeWalker.toCheckPoint = nextRoutePoint;
        }
    }

    private isCheckPointReached() {
        const { toCheckPoint, prevPos, currPos } = this.routeWalker;
        const route = this.routeWalker.route
        const character = route.character;
        
        const curr = character.getPosition();
    
        const isWithinDestRadius = toCheckPoint.subtract(curr).length() < 0.2;
        const isLeavingDest = prevPos && prevPos.subtract(toCheckPoint).length() < currPos.subtract(toCheckPoint).length();
    
        return isWithinDestRadius || isLeavingDest;
    }
}