import { InjectProperty } from "../di/diDecorators";
import { RouteStore } from "../stores/RouteStore";
import { lookup } from "./Lookup";

export class TurnBasedCommandService {

    @InjectProperty("RouteStore")
    private routeStore: RouteStore;

    constructor() {
        this.routeStore = lookup.routeStore;
    }

    executeTurn() {
        this.routeStore.getRoutes().forEach(route => route.walker.setPaused(false));
    }
}