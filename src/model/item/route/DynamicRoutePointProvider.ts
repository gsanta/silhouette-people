
import { Vector3 } from "babylonjs";
import { Graph } from "../../../service/graph/Graph";
import { GraphEdge, GraphVertex } from "../../../service/graph/GraphImpl";
import { RouteItem } from "./RouteItem";
import { RoutePointProvider } from "./RoutepointProvider";

export class DynamicRoutePointProvider implements RoutePointProvider {
    private route: RouteItem;
    private readonly graph: Graph<GraphVertex, GraphEdge>;

    constructor(graph: Graph<GraphVertex, GraphEdge>) {
        this.graph = graph;
    }

    setRoute(route: RouteItem) {
        this.route = route;

        const points = this.route.getRoutePoints().length;
        if (points !== 2) {
            throw new Error(`Dynamic route can be initialized only with a route with 2 route points, it contains ${points}`);
        }

        this.createNextRoutePoint(points[1], points[0]);
    }

    getNextRoutePoint(currPoint: Vector3, prevPoint: Vector3) {
        this.createNextRoutePoint(currPoint, prevPoint);

        const routePoints = this.route.getRoutePoints();

        if (currPoint === routePoints[routePoints.length - 1]) {
            return undefined;
        } else {
            return routePoints[routePoints.indexOf(currPoint) + 1];
        }
    }

    private createNextRoutePoint(currPoint: Vector3, prevPoint: Vector3): void {
        const validEdges = this.findValidEdges(currPoint, prevPoint);
        const currVertex = this.graph.getByPos(currPoint);

        if (validEdges.length > 0) {
            const nextVertex = validEdges[0].getOtherVertex(currVertex);
            this.route.addPoint(nextVertex.p);
        }
    }

    private findValidEdges(currPoint: Vector3, prevPoint: Vector3): GraphEdge[] {
        const currVertex = this.graph.getByPos(currPoint);
        let edges = this.graph.getEdges(currVertex);

        if (prevPoint) {
            const prevVertex = this.graph.getByPos(currPoint);
            const edge = this.graph.edgeBetween(currVertex, prevVertex);
            edges = edges.filter(e => e !== edge);
        }

        return edges;
    }
}