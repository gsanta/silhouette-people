import { RouteJson } from "../../model/objects/route/RouteItem";
import { RouteStore } from "../../store/RouteStore";


export class RouteImporter {

    private readonly routeStore: RouteStore;

    constructor(routeStore: RouteStore) {
        this.routeStore = routeStore;
    }

    import(routeJson: RouteJson[]) {
        routeJson.forEach(route => this.routeStore.addRoute(route));
    }
}