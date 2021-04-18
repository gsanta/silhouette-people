import { Vector2 } from "babylonjs";
import { Route } from "./Route";
import { RouteWalker } from "./RouteWalker";

export class RealTimeRouteWalker implements RouteWalker {

    private _isFinished: boolean = false;
    private prevCheckPoint: Vector2;
    private currCheckPoint: Vector2;
    private prevPos: Vector2;
    private currPos: Vector2;

    constructor(private route: Route) {}

    step(deltaTime: number) {
        if (this.isFinished()) { throw new Error('Stepping a finished route is not allowed.') }

        this.checkDestReached();
        
        if (!this.isFinished) { this.moveGameObject(); }
    }

    isFinished() {
        return this._isFinished;
    }

    isAtCheckPoint(): boolean {
        throw new Error("Method not implemented.");
    }

    private moveGameObject() {
        const { character } = this.route;

        const dirVector = this.currCheckPoint.subtract(this.prevCheckPoint);
        const dirAngle = Math.atan2(dirVector.y, dirVector.x);

        character.setRotation(Math.PI / 2 - dirAngle);
        character.move(0.04);

        this.prevPos = this.currPos;
        this.currPos = character.getPosition2D();
    }

    private checkDestReached() {
        const { character, checkPoints } = this.route;

        if (!this.isDestReached()) { return; }

        if (this.currCheckPoint === checkPoints[checkPoints.length - 1]) {
            this._isFinished = true;
        } else {
            this.prevCheckPoint = character.getPosition2D();
            this.currCheckPoint = checkPoints[checkPoints.indexOf(this.currCheckPoint) + 1];
        }
    }

    private isDestReached() {
        const { character } = this.route;

        if (!this.currCheckPoint) { return true; }

        const curr = character.getPosition();

        const isWithinDestRadius = this.currCheckPoint.subtract(new Vector2(curr.x, curr.z)).length() < 0.2;
        const isLeavingDest = this.prevPos && this.prevPos.subtract(this.currCheckPoint).length() < this.currPos.subtract(this.currCheckPoint).length();

        return isWithinDestRadius || isLeavingDest;
    }
}