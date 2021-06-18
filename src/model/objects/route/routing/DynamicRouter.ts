
import { Graph } from "../../../../service/graph/Graph";
import { GraphEdge } from "../../../../service/graph/GraphEdge";
import { GraphVertex } from "../../../../service/graph/GraphImpl";
import { RouteController } from "../../game_object/controller_route/RouteController";
import { IRouter } from "./IRouter";

export class DynamicRouter implements IRouter {
    private readonly routeWalker: RouteController;
    private readonly graph: Graph<GraphVertex, GraphEdge>;

    constructor(routeWalker: RouteController, graph: Graph<GraphVertex, GraphEdge>) {
        this.graph = graph;
        this.routeWalker = routeWalker;
    }

    edgeChanged(): void {
        const target = this.routeWalker.getTarget();
        const source = this.routeWalker.getSource();

        if (target !== undefined) {
            const validEdges = this.findValidEdges(target, source) || [];
            let route = this.routeWalker.getRoute();
    
            if (validEdges.length > 0) {
                const edgeIndex = Math.floor(Math.random() * validEdges.length);
                route = route.addEdge(validEdges[edgeIndex]);
            }

            if (route.getEdges()[0] !== this.routeWalker.getEdge()) {
                route = route.removeFirstEdge();
            }

            this.routeWalker.setRoute(route);
        }
    }

    private findValidEdges(currPoint: GraphVertex, prevPoint: GraphVertex): GraphEdge[] {
        let edges = this.graph.getEdges(currPoint);

        if (prevPoint) {
            const edge = this.graph.edgeBetween(currPoint, prevPoint);
            edges = edges.filter(e => e !== edge);
        }

        return edges;
    }
}