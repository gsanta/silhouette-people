import { Vector2 } from "babylonjs";
import { Route } from "./Route";
import { RouteWalker } from "./RouteWalker";

export class StoppingRouteWalker implements RouteWalker {

    private _isFinished: boolean = false;
    private fromCheckPoint: Vector2;
    private toCheckPoint: Vector2;
    private prevPos: Vector2;
    private currPos: Vector2;
    private _isPaused = false;

    constructor(public route: Route) {

        this.fromCheckPoint = route.checkPoints[0];
        this.toCheckPoint = route.checkPoints[1];
        route.character.setPosition2D(this.fromCheckPoint);
    }

    step(deltaTime: number) {
        if (this.isFinished()) { throw new Error('Stepping a finished route is not allowed.') }

        this.checkDestReached();
        
        if (!this.isFinished()) { this.moveGameObject(); }
    }

    isFinished() {
        return this._isFinished;
    }

    isPaused(): boolean {
        return this._isPaused;
    }

    setPaused(isPaused: boolean) {
        this._isPaused = isPaused;
    }

    isAtCheckPoint(): boolean {
        throw new Error("Method not implemented.");
    }

    private moveGameObject() {
        const { character } = this.route;

        const dirVector = this.toCheckPoint.subtract(this.fromCheckPoint);
        const dirAngle = Math.atan2(dirVector.y, dirVector.x);

        character.setRotation(Math.PI / 2 - dirAngle);
        character.move(0.04);

        this.prevPos = this.currPos;
        this.currPos = character.getPosition2D();
    }

    private checkDestReached() {
        const { character, checkPoints } = this.route;

        if (!this.isDestReached()) { return; }

        if (this.toCheckPoint === checkPoints[checkPoints.length - 1]) {
            this._isFinished = true;
        } else {
            this.fromCheckPoint = character.getPosition2D();
            this.toCheckPoint = checkPoints[checkPoints.indexOf(this.toCheckPoint) + 1];
        }
    }

    private isDestReached() {
        const { character } = this.route;

        if (!this.toCheckPoint) { return true; }

        const curr = character.getPosition();

        const isWithinDestRadius = this.toCheckPoint.subtract(new Vector2(curr.x, curr.z)).length() < 0.2;
        const isLeavingDest = this.prevPos && this.prevPos.subtract(this.toCheckPoint).length() < this.currPos.subtract(this.toCheckPoint).length();

        return isWithinDestRadius || isLeavingDest;
    }
}