import { RouteJson } from "../../../model/objects/route/RouteItem";
import { RouteStore } from "../../../store/RouteStore";

export class RouteExporter {

    private readonly routeStore: RouteStore;

    constructor(routeStore: RouteStore) {
        this.routeStore = routeStore;
    }

    export(): RouteJson[] {
        return this.routeStore.getRoutes();
    }
}