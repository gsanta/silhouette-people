
import { KeyboardService } from "../../../../../service/base/keyboard/KeyboardService";
import { Graph } from "../../../../../service/graph/Graph";
import { GraphEdge, GraphVertex } from "../../../../../service/graph/GraphImpl";
import { RouteWalker } from "../../RouteWalker";

export class DynamicRouter {
    private readonly routeWalker: RouteWalker;
    private readonly graph: Graph<GraphVertex, GraphEdge>;
    private readonly keyboardService: KeyboardService;

    constructor(routeWalker: RouteWalker, graph: Graph<GraphVertex, GraphEdge>, keyboardService: KeyboardService) {
        this.graph = graph;
        this.routeWalker = routeWalker;
        this.keyboardService = keyboardService;
    

        // this.keyboardService.onKeydown()
    }

    // private chooseNextEdge(edge: GraphEdge) {
    //     const anchorVertex = this.routeWalker.isReversed() ? edge.v2 : edge.v1;

    //     const edges = this.graph.getEdges(anchorVertex);
    //     const nextIndex = edges.indexOf(edge);

    //     if (nextIndex < edges.length) {
    //         this.routeWalker.getRoute().removeLastPoint();
    //     }
    // }

    progress(): void {
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