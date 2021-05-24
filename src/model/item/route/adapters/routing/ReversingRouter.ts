import { RouteWalker } from "../../RouteWalker";
import { IRouter } from "./IRouter";

export class ReversingRouter implements IRouter {
    private readonly routeWalker: RouteWalker;

    constructor(routeWalker: RouteWalker) {
        this.routeWalker = routeWalker;
    }

    edgeChanged(): void {
        if (this.routeWalker.getEdge() === undefined) {
            const reversedRoute = this.routeWalker.getRoute().reverse();
            this.routeWalker.setRoute(reversedRoute);
            if (reversedRoute.getEdges().length > 0) {
                this.routeWalker.setEdge(reversedRoute.getEdges()[0]);
            }
        }
    }
}