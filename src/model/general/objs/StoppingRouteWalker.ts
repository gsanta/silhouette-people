import { RouteWalker } from "./RouteWalker";

export class StoppingRouteWalker extends RouteWalker {
    step(deltaTime: number) {
        if (this.isPaused()) { return; }

        if (this.isCheckPointReached()) {
            this.setNextCheckPoint();
            this.setPaused(true);
        }
        
        if (!this.isFinished()) { this.moveCharacter(); }
    }
}