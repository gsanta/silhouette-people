import { DestinationPointUpdater } from "./DestinationPointUpdater";
import { RoutePointProvider } from "./RoutepointProvider";
import { RouteWalker } from "./RouteWalker";
import { RouteWalkerListener } from "./RouteWalkerListener";

export class DestinationPointUpdaterAdapter extends RouteWalkerListener {

    private readonly updater: DestinationPointUpdater;
    private readonly routePointProvider: RoutePointProvider;
    private readonly routeWalker: RouteWalker;

    constructor(routeWalker: RouteWalker, routePointProvider: RoutePointProvider) {
        super();
        this.routePointProvider = routePointProvider;
        this.routeWalker = routeWalker;
        this.updater = new DestinationPointUpdater(routeWalker, routePointProvider);
    }

    onWalk() {
        this.updater.updateCheckPointsIfNeeded();
    }

    onStarted() {
        this.updater.initCheckPoints();
    }

    onDirectionChanged() {
        this.routePointProvider.routeDirectionChanged();
    }
}
