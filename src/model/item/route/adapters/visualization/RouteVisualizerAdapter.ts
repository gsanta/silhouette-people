import { Mesh } from "babylonjs";
import { GraphService } from "../../../../../service/graph/GraphService";
import { RouteController } from "../../../../objects/game_object/controller_route/RouteController";
import { RouteControllerListener } from "../../../../objects/game_object/controller_route/RouteControllerListener";

export class RouteVisualizerAdapter extends RouteControllerListener {

    private readonly routeWalker: RouteController;
    private readonly graphService: GraphService;

    private meshes: Mesh[] = [];

    constructor(routeWalker: RouteController, graphService: GraphService) {
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