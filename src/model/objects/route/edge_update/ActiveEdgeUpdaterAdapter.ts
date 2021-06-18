import { ActiveEdgeUpdater } from "./ActiveEdgeUpdater";
import { RouteController } from "../../game_object/controller_route/RouteController";
import { RouteControllerListener } from "../../game_object/controller_route/RouteControllerListener";

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
