import { ActiveEdgeUpdater } from "./ActiveEdgeUpdater";
import { RouteWalker } from "../../RouteWalker";
import { RouteWalkerListener } from "../../RouteWalkerListener";

export class ActiveEdgeUpdaterAdapter extends RouteWalkerListener {

    private readonly updater: ActiveEdgeUpdater;

    constructor(routeWalker: RouteWalker) {
        super();
        this.updater = new ActiveEdgeUpdater(routeWalker);
    }

    onWalk() {
        this.updater.updateActiveEdge();
    }

    onStarted() {
        this.updater.initActiveEdge();
    }

    onDirectionChanged() {
        this.updater.updateSide();
    }
}
