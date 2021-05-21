import { Graph } from "../../../service/graph/Graph";
import { GraphEdge, GraphVertex } from "../../../service/graph/GraphImpl";
import { DynamicRoutePointProvider } from "./DynamicRoutePointProvider";
import { RouteWalker } from "./RouteWalker";
import { RouteWalkerListener } from "./RouteWalkerListener";

export class DynamicRoutePointProviderAdapter extends RouteWalkerListener {

    private pointProvider: DynamicRoutePointProvider;

    constructor(routeWalker: RouteWalker, graph: Graph<GraphVertex, GraphEdge>) {
        super();

        this.pointProvider = new DynamicRoutePointProvider(routeWalker, graph, null);
    }

    onEnterEdge() {
        this.pointProvider.progress();
    }
}
