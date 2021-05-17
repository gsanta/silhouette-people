import { DestinationPointUpdater } from "./DestinationPointUpdater";
import { RouteWalker } from "./RouteWalker";
import { RouteWalkerListener } from "./RouteWalkerListener";

export class DestinationPointUpdaterAdapter extends RouteWalkerListener {

    private readonly updater: DestinationPointUpdater;

    constructor(routeWalker: RouteWalker) {
        super();
        this.updater = new DestinationPointUpdater(routeWalker);
    }

    onWalk() {
        this.updater.updateCheckPointsIfNeeded();
    }

    onStarted() {
        this.updater.initCheckPoints();
    }
}
