
import { Graph } from "../../../service/graph/Graph";
import { GraphEdge, GraphVertex } from "../../../service/graph/GraphImpl";
import { RouteWalker } from "./RouteWalker";

export class DynamicRoutePointProvider {
    private readonly routeWalker: RouteWalker;
    private readonly graph: Graph<GraphVertex, GraphEdge>;

    constructor(routeWalker: RouteWalker, graph: Graph<GraphVertex, GraphEdge>) {
        this.graph = graph;
        this.routeWalker = routeWalker;
    }

    createNextRoutePoint(): void {
        const currPoint = this.routeWalker.getDestPoint();
        const prevPoint = this.routeWalker.getPrevDestPoint();

        if (currPoint !== undefined) {
            const validEdges = this.findValidEdges(currPoint, prevPoint) || [];
    
            if (validEdges.length > 0) {
                const nextVertex = validEdges[0].getOtherVertex(currPoint);            
                this.routeWalker.getRoute().addPoint(nextVertex);
            }
            if (this.routeWalker.getRoute().getRoutePoints()[0] !== prevPoint) {
                this.routeWalker.getRoute().removeFirstPoint();
            }
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