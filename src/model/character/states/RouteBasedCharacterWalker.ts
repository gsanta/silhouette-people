import { RouteObj } from "../../general/objs/RouteObj";
import { MeshWalker } from "../../general/state/MeshWalker";

export class RouteBasedCharacterWalker extends MeshWalker {

    constructor(private route: RouteObj) {
        super();
    }

    walk() {
        const { walker: routeWalker } = this.route; 
        if (routeWalker.isPaused() || routeWalker.isFinished()) { return; }
    
        if (routeWalker.updateCheckPointsIfNeeded()) {
            routeWalker.setPaused(true);
        }

        if (!routeWalker.isFinished()) { this.moveCharacter() }
    }

    private moveCharacter() {
        const { character } = this.route;
        const { toCheckPoint, fromCheckPoint, currPos } = this.route.walker;

        const dirVector = toCheckPoint.subtract(fromCheckPoint);
        const dirAngle = Math.atan2(dirVector.y, dirVector.x);

        character.setRotation(Math.PI / 2 - dirAngle);
        character.move(0.04);

        this.route.walker.prevPos = currPos;
        this.route.walker.currPos = character.getPosition();
    }
}