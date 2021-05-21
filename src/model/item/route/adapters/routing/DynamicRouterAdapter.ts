import { Graph } from "../../../../../service/graph/Graph";
import { GraphEdge, GraphVertex } from "../../../../../service/graph/GraphImpl";
import { DynamicRouter } from "./DynamicRouter";
import { RouteWalker } from "../../RouteWalker";
import { RouteWalkerListener } from "../../RouteWalkerListener";

export class DynamicRouterAdapter extends RouteWalkerListener {

    private pointProvider: DynamicRouter;

    constructor(routeWalker: RouteWalker, graph: Graph<GraphVertex, GraphEdge>) {
        super();

        this.pointProvider = new DynamicRouter(routeWalker, graph, null);
    }

    onEnterEdge() {
        this.pointProvider.progress();
    }
}
