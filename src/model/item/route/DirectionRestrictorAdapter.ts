import { DestinationPointUpdater } from "./DestinationPointUpdater";
import { DirectionRestrictor } from "./DirectionRestrictor";
import { RoutePointProvider } from "./RoutepointProvider";
import { RouteWalker } from "./RouteWalker";
import { RouteWalkerListener } from "./RouteWalkerListener";

export class DirectionRestrictorAdapter extends RouteWalkerListener {

    private restrictor: DirectionRestrictor;

    constructor(routeWalker: RouteWalker) {
        super();

        this.restrictor = new DirectionRestrictor(routeWalker);
    }

    onWalk(deltaTime: number) {
        this.restrictor.update(deltaTime);
    }

    onStarted() {
        this.restrictor.on();
    }

    onFinished() {
        this.restrictor.off();
    }
}
