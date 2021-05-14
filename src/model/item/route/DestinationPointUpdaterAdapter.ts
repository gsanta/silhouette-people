import { DestinationPointUpdater } from "./DestinationPointUpdater";
import { RoutePointProvider } from "./RoutepointProvider";
import { RouteWalker } from "./RouteWalker";
import { RouteWalkerListener } from "./RouteWalkerListener";

export class DestinationPointUpdaterAdapter extends RouteWalkerListener {

    private updater: DestinationPointUpdater;

    constructor(routeWalker: RouteWalker, routePointProvider: RoutePointProvider) {
        super();

        this.updater = new DestinationPointUpdater(routeWalker, routePointProvider);
    }

    onWalk() {
        this.updater.updateCheckPointsIfNeeded();
    }
}
