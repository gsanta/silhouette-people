import { Mesh } from "babylonjs";
import { GraphService } from "../../../../../service/graph/GraphService";
import { RouteWalker } from "../../RouteWalker";
import { RouteWalkerListener } from "../../RouteWalkerListener";

export class RouteVisualizerAdapter extends RouteWalkerListener {

    private readonly routeWalker: RouteWalker;
    private readonly graphService: GraphService;

    private meshes: Mesh[] = [];

    constructor(routeWalker: RouteWalker, graphService: GraphService) {
        super();

        this.routeWalker = routeWalker;
        this.graphService = graphService;
    }

    onEnterEdge() {
        this.meshes.forEach(mesh => mesh.dispose());
        this.meshes = this.graphService.getVisualizer().visualizeRoute(this.routeWalker.getRoute(), this.routeWalker);
    }

    onRouteChanged() {
        this.meshes.forEach(mesh => mesh.dispose());
        this.meshes = this.graphService.getVisualizer().visualizeRoute(this.routeWalker.getRoute(), this.routeWalker);
    }
}