import { DirectionRestrictor } from "./RotationRestrictor";
import { RouteWalker } from "../../RouteWalker";
import { RouteWalkerListener } from "../../RouteWalkerListener";

export class DirectionRestrictorAdapter extends RouteWalkerListener {

    private restrictor: DirectionRestrictor;

    constructor(routeWalker: RouteWalker) {
        super();

        this.restrictor = new DirectionRestrictor(routeWalker);
    }

    onWalk() {
        this.restrictor.positionChanged();
    }

    onEnterEdge() {
        this.restrictor.edgeChanged();
    }

    onStarted() {
        this.restrictor.on();
    }

    onFinished() {
        this.restrictor.off();
    }
}
