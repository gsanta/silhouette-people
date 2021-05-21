import { GraphEdge, GraphImpl, GraphVertex } from "../../../../../service/graph/GraphImpl";
import { RouteWalker } from "../../RouteWalker";

export class NextEdgeSelector {

    private readonly routeWalker: RouteWalker;
    private graph: GraphImpl;

    constructor(routeWalker: RouteWalker, graph: GraphImpl) {
        this.routeWalker = routeWalker;
        this.graph = graph;
    }

    chooseNextEdge() {
        const currentEdge = this.routeWalker.getEdge();
        const routeEdges = this.routeWalker.getRoute().getEdges();
        const lastEdge = routeEdges[routeEdges.length - 1];

        if (currentEdge) {
            const anchorVertex = this.routeWalker.isReversed() ? lastEdge.v2 : lastEdge.v1;
    
            const edges = this.getValidEdges(anchorVertex, [currentEdge, lastEdge]);
            const nextIndex = edges.indexOf(lastEdge);
    
            if (edges.length > 0) {
                let route = this.routeWalker.getRoute();
                route = route.removeLastEdge();
                route = route.addEdge(edges[0]);
                this.routeWalker.setRoute(route);
            }
        }
    }

    private getValidEdges(anchorVertex: GraphVertex, invalidEdges: GraphEdge[]) {
        const edges = this.graph.getEdges(anchorVertex);
        return edges.filter(edge => !invalidEdges.includes(edge));
    }

    choosePrevEdge() {
        const edge = this.routeWalker.getEdge();

        if (edge) {
            const anchorVertex = this.routeWalker.isReversed() ? edge.v2 : edge.v1;
    
            const edges = this.graph.getEdges(anchorVertex);
            const nextIndex = edges.indexOf(edge);
    
            if (nextIndex > 0) {
                let route = this.routeWalker.getRoute();
                route = route.removeLastEdge();
                route = route.addEdge(edges[nextIndex]);
            }
        }
    }
}