import { Vector2 } from "babylonjs";
import { Route } from "./Route";

export abstract class RouteWalker {
    protected _isFinished: boolean = false;
    protected fromCheckPoint: Vector2;
    protected toCheckPoint: Vector2;
    protected prevPos: Vector2;
    protected currPos: Vector2;
    protected _isPaused = false;

    
    constructor(public route: Route) {
        this.fromCheckPoint = route.checkPoints[0];
        this.toCheckPoint = route.checkPoints[1];
        route.character.setPosition2D(this.fromCheckPoint);
    }

    abstract step(deltaTime: number): void;

    isFinished(): boolean {
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


    protected setNextCheckPoint() {
        const { character, checkPoints } = this.route;
    
        if (!this.isCheckPointReached()) { return; }
    
        if (this.toCheckPoint === checkPoints[checkPoints.length - 1]) {
            this._isFinished = true;
        } else {
            this.fromCheckPoint = character.getPosition2D();
            this.toCheckPoint = checkPoints[checkPoints.indexOf(this.toCheckPoint) + 1];
        }
    }
    
    protected isCheckPointReached() {
        const { character } = this.route;
    
        if (!this.toCheckPoint) { return true; }
    
        const curr = character.getPosition();
    
        const isWithinDestRadius = this.toCheckPoint.subtract(new Vector2(curr.x, curr.z)).length() < 0.2;
        const isLeavingDest = this.prevPos && this.prevPos.subtract(this.toCheckPoint).length() < this.currPos.subtract(this.toCheckPoint).length();
    
        return isWithinDestRadius || isLeavingDest;
    }

    protected moveCharacter() {
        const { character } = this.route;

        const dirVector = this.toCheckPoint.subtract(this.fromCheckPoint);
        const dirAngle = Math.atan2(dirVector.y, dirVector.x);

        character.setRotation(Math.PI / 2 - dirAngle);
        character.move(0.04);

        this.prevPos = this.currPos;
        this.currPos = character.getPosition2D();
    }
}