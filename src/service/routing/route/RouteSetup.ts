import { RouteStore } from "../../../store/RouteStore";
import { ISetup } from "../../setup/ISetup";
import { RouteFactory } from "../RouteFactory";

export class RouteSetup implements ISetup {
    private readonly routeStore: RouteStore;
    private readonly routeFactory: RouteFactory;

    constructor(routeStore: RouteStore, routeFactory: RouteFactory) {
        this.routeStore = routeStore;
        this.routeFactory = routeFactory;
    }

    async setup(): Promise<void> {
        // const routes = this.routeStore.getRoutes();

        // routes.forEach(route => this.routeFactory.create(route));
    }
}