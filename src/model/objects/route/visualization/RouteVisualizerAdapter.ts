import { Mesh } from "babylonjs";
import { GraphService } from "../../../../service/graph/GraphService";
import { MaterialStore } from "../../../../store/MaterialStore";
import { RouteController } from "../../game_object/controller_route/RouteController";
import { RouteControllerListener } from "../../game_object/controller_route/RouteControllerListener";

export class RouteVisualizerAdapter extends RouteControllerListener {

    private readonly routeWalker: RouteController;
    private readonly graphService: GraphService;
    private readonly materialStore: MaterialStore;

    private meshes: Mesh[] = [];

    constructor(routeWalker: RouteController, graphService: GraphService, materialStore: MaterialStore) {
        super();

        this.routeWalker = routeWalker;
        this.graphService = graphService;
        this.materialStore = materialStore;
    }

    onEnterEdge() {
        this.meshes.forEach(mesh => mesh.dispose());
        this.meshes = this.graphService.getVisualizer().visualizeRoute(this.routeWalker.getRoute(), this.materialStore.getActivePathMaterial());
    }

    onRouteChanged() {
        this.meshes.forEach(mesh => mesh.dispose());
        this.meshes = this.graphService.getVisualizer().visualizeRoute(this.routeWalker.getRoute(), this.materialStore.getActivePathMaterial());
    }
}