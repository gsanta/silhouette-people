
import { Vector3 } from "babylonjs";
import { Graph } from "../../../service/graph/Graph";
import { GraphEdge, GraphVertex } from "../../../service/graph/GraphImpl";
import { RoutePointProvider } from "./RoutepointProvider";
import { RouteWalker } from "./RouteWalker";

export class DynamicRoutePointProvider implements RoutePointProvider {
    private readonly routeWalker: RouteWalker;
    private readonly graph: Graph<GraphVertex, GraphEdge>;

    constructor(routeWalker: RouteWalker, graph: Graph<GraphVertex, GraphEdge>) {
        this.graph = graph;
        this.routeWalker = routeWalker;
        this.initRoute();
    }

    getNextRoutePoint(currPoint: Vector3, prevPoint: Vector3) {

        const routePoints = this.routeWalker.getRoute().getRoutePoints();
        let nextRoutePoint: Vector3;

        if (currPoint === routePoints[routePoints.length - 1]) {
            nextRoutePoint = undefined;
        } else {
            nextRoutePoint = routePoints[routePoints.indexOf(currPoint) + 1];
            this.createNextRoutePoint(nextRoutePoint, currPoint);
        }
        return nextRoutePoint;
    }

    private createNextRoutePoint(currPoint: Vector3, prevPoint: Vector3): void {
        const validEdges = this.findValidEdges(currPoint, prevPoint) || [];
        const currVertex = this.graph.getByPos(currPoint);

        if (validEdges.length > 0) {
            const nextVertex = validEdges[0].getOtherVertex(currVertex);
            if (this.routeWalker.getRoute().getRoutePoints().length >= 3) {
                this.routeWalker.getRoute().removeFirstPoint();
            }
            this.routeWalker.getRoute().addPoint(nextVertex.p);
        }
    }

    private findValidEdges(currPoint: Vector3, prevPoint: Vector3): GraphEdge[] {
        const currVertex = this.graph.getByPos(currPoint);
        let edges = this.graph.getEdges(currVertex);

        if (prevPoint) {
            const prevVertex = this.graph.getByPos(prevPoint);
            const edge = this.graph.edgeBetween(currVertex, prevVertex);
            edges = edges.filter(e => e !== edge);
        }

        return edges;
    }

    private initRoute() {
        const points = this.routeWalker.getRoute().getRoutePoints();
        if (points.length !== 2) {
            throw new Error(`Dynamic route can be initialized only with a route with 2 route points, it contains ${points.length}`);
        }

        this.createNextRoutePoint(points[1], points[0]);
    }
}