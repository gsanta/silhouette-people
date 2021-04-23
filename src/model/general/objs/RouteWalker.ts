import { Vector2 } from "babylonjs";
import { Vector3 } from "babylonjs/Maths/math.vector";
import { RouteObj } from "./RouteObj";

export abstract class RouteWalker {
    protected _isFinished: boolean = false;
    fromCheckPoint: Vector3;
    toCheckPoint: Vector3;
    prevPos: Vector3;
    currPos: Vector3;
    protected _isPaused = false;
    
    constructor(public route: RouteObj) {}

    step(deltaTime: number): void {
        if (this.isPaused() || this.isFinished()) { return; }
    
        if (this.updateCheckPointsIfNeeded()) {
            this.setPaused(true);
        } else {
            if (!this.isFinished()) { this.moveCharacter(); }
        }
        
    }

    isFinished(): boolean {
        return this._isFinished;
    }

    isPaused(): boolean {
        return this._isPaused;
    }

    setPaused(isPaused: boolean) {
        this._isPaused = isPaused;
        
        if (isPaused) {
            const { character } = this.route;
            character.walker.setSpeed(0);
        }
    }

    private setFinished(isFinished) {
        this._isFinished = isFinished;
        
        if (isFinished) {
            const { character } = this.route;
            character.walker.setSpeed(0);
        }

    }

    isAtCheckPoint(): boolean {
        throw new Error("Method not implemented.");
    }


    protected setNextCheckPoint() {
        const { character} = this.route;
        const checkPoints = this.route.getCheckpoints();
    
        if (this.toCheckPoint === checkPoints[checkPoints.length - 1]) {
            this.setFinished(true);
        } else {
            this.fromCheckPoint = character.getPosition();
            this.toCheckPoint = checkPoints[checkPoints.indexOf(this.toCheckPoint) + 1];
        }
    }
    
    updateCheckPointsIfNeeded() {
        if (!this.fromCheckPoint || !this.toCheckPoint) {
            this.initCheckPoints();
            this.route.character.setPosition2D(new Vector2(this.fromCheckPoint.x, this.fromCheckPoint.z));
        } else if (this.isCheckPointReached()) {
            this.setNextCheckPoint();
            return true;
        }
    }

    private initCheckPoints() {
        const checkPoints = this.route.getCheckpoints();
        this.fromCheckPoint = checkPoints[0];
        this.toCheckPoint = checkPoints[1];
    }

    private isCheckPointReached() {
        const { character } = this.route;
        const curr = character.getPosition();
    
        const isWithinDestRadius = this.toCheckPoint.subtract(curr).length() < 0.2;
        const isLeavingDest = this.prevPos && this.prevPos.subtract(this.toCheckPoint).length() < this.currPos.subtract(this.toCheckPoint).length();
    
        return isWithinDestRadius || isLeavingDest;
    }

    protected moveCharacter() {
        const { character } = this.route;

        const dirVector = this.toCheckPoint.subtract(this.fromCheckPoint);
        const dirAngle = Math.atan2(dirVector.y, dirVector.x);

        character.setRotation(Math.PI / 2 - dirAngle);
        character.walker.setSpeed(0.04)

        this.prevPos = this.currPos;
        this.currPos = character.getPosition();
    }
}