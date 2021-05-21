import { Tools } from "babylonjs";
import { Direction } from "../../../../../service/graph/Direction";
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
        const route = this.routeWalker.getRoute();
        const currentEdge = this.routeWalker.getEdge();
        const routeEdges = this.routeWalker.getRoute().getEdges();
        const lastEdge = routeEdges[routeEdges.length - 1];

        if (currentEdge && lastEdge !== currentEdge) {
            const anchorVertex = route.isReversed(lastEdge) ? lastEdge.v2 : lastEdge.v1;
    
            let edges = this.getValidEdges(anchorVertex, [currentEdge, lastEdge]);
    
            if (edges.length > 0) {
                edges = this.orderEdgesByAngle(lastEdge, edges);
                let route = this.routeWalker.getRoute();
                route = route.removeLastEdge();
                route = route.addEdge(edges[0]);
                this.routeWalker.setRoute(route);
            }
        }
    }

    choosePrevEdge() {
        const route = this.routeWalker.getRoute();
        const currentEdge = this.routeWalker.getEdge();
        const routeEdges = this.routeWalker.getRoute().getEdges();
        const lastEdge = routeEdges[routeEdges.length - 1];

        if (currentEdge && lastEdge !== currentEdge) {
            const anchorVertex = route.isReversed(lastEdge) ? lastEdge.v2 : lastEdge.v1;
    
            let edges = this.getValidEdges(anchorVertex, [currentEdge, lastEdge]);
    
            if (edges.length > 0) {
                edges = this.orderEdgesByAngle(lastEdge, edges, false);
                let route = this.routeWalker.getRoute();
                route = route.removeLastEdge();
                route = route.addEdge(edges[0]);
                this.routeWalker.setRoute(route);
            }
        }
    }

    private orderEdgesByAngle(sourceEdge: GraphEdge, targetEdges: GraphEdge[], ascending = true): GraphEdge[] {
        const angles: Map<GraphEdge, number> = new Map();
        targetEdges.forEach(targetEdge => {
            const angle = Direction.angleBetween(sourceEdge.direction, targetEdge.direction);
            angles.set(targetEdge, angle);
        });
        
        targetEdges = [...targetEdges];
        
        if (ascending) {
            targetEdges.sort((edge1, edge2) => angles.get(edge1) - angles.get(edge2));
        } else {
            targetEdges.sort((edge1, edge2) => angles.get(edge2) - angles.get(edge1));
        }

        return targetEdges;
    }

    private getValidEdges(anchorVertex: GraphVertex, invalidEdges: GraphEdge[]) {
        const edges = this.graph.getEdges(anchorVertex);
        return edges.filter(edge => !invalidEdges.includes(edge));
    }
}