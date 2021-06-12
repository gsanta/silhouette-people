import { ActiveEdgeUpdater } from "./ActiveEdgeUpdater";
import { RouteController } from "../../RouteController";
import { RouteControllerListener } from "../../RouteControllerListener";

export class ActiveEdgeUpdaterAdapter extends RouteControllerListener {

    private readonly updater: ActiveEdgeUpdater;

    constructor(routeWalker: RouteController) {
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
