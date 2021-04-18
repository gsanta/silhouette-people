import { Vector2 } from "babylonjs/Maths/math.vector";
import { Route } from "./Route";

export interface RouteWalker {
    route: Route;
    step(deltaTime: number): void;
    isAtCheckPoint(): boolean;
    isFinished(): boolean;
    isPaused(): boolean;
    setPaused(isPaused: boolean);
}


export function isCheckPointReached(routeWalker: RouteWalker, toCheckPoint: Vector2) {
    const { character, checkPoints } = routeWalker.route;

    if (!this.isDestReached()) { return; }

    if (routeWalker.toCheckPoint === checkPoints[checkPoints.length - 1]) {
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