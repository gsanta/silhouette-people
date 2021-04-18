import { Vector2 } from "babylonjs";
import { Route } from "./Route";
import { RouteWalker } from "./RouteWalker";

export class RealTimeRouteWalker extends RouteWalker {
    step(deltaTime: number) {
        if (this.isCheckPointReached()) {
            this.setNextCheckPoint();
        }
        
        if (!this.isFinished()) { this.moveCharacter(); }
    }
}