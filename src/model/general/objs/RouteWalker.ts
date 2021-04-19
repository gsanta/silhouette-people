import { Vector2 } from "babylonjs";
import { RouteObj } from "./RouteObj";

export abstract class RouteWalker {
    protected _isFinished: boolean = false;
    fromCheckPoint: Vector2;
    toCheckPoint: Vector2;
    prevPos: Vector2;
    currPos: Vector2;
    protected _isPaused = false;
    
    constructor(public route: RouteObj) {}

    step(deltaTime: number): void {
        // if (this.isPaused() || this.isFinished()) { return; }
    
        // if (this.updateCheckPointsIfNeeded()) {
        //     this.setPaused(true);
        // }
        
        // if (!this.isFinished()) { this.route.character.walker.walk(); }
    }

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
    
        if (this.toCheckPoint === checkPoints[checkPoints.length - 1]) {
            this._isFinished = true;
        } else {
            this.fromCheckPoint = character.getPosition2D();
            this.toCheckPoint = checkPoints[checkPoints.indexOf(this.toCheckPoint) + 1];
        }
    }
    
    updateCheckPointsIfNeeded() {
        if (!this.fromCheckPoint || !this.toCheckPoint) {
            this.initCheckPoints();
            this.route.character.setPosition2D(this.fromCheckPoint);
        } else if (this.isCheckPointReached()) {
            this.setNextCheckPoint();
            return true;
        }
    }

    private initCheckPoints() {
        const { checkPoints } = this.route;
        this.fromCheckPoint = checkPoints[0];
        this.toCheckPoint = checkPoints[1];
    }

    private isCheckPointReached() {
        const { character } = this.route;
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