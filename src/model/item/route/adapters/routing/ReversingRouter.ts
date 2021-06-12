import { RouteItem } from "../../RouteItem";
import { RouteController } from "../../RouteController";
import { IRouter } from "./IRouter";

export class ReversingRouter implements IRouter {
    private readonly routeWalker: RouteController;
    private readonly referenceRoute: RouteItem;

    constructor(routeWalker: RouteController) {
        this.routeWalker = routeWalker;
        this.referenceRoute = routeWalker.getRoute();
    }

    edgeChanged(): void {
        const route = this.routeWalker.getRoute();
        if (this.routeWalker.getEdge() === undefined) {
            let newRoute: RouteItem = route.lastVertex !== this.referenceRoute.lastVertex ? this.referenceRoute : this.referenceRoute.reverse();
            this.routeWalker.setRoute(newRoute);
            if (newRoute.getEdges().length > 0) {
                this.routeWalker.setEdge(newRoute.getEdges()[0]);
            }
        }
    }
}