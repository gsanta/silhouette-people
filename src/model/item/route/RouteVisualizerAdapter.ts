import { GraphService } from "../../../service/graph/GraphService";
import { RouteWalker } from "./RouteWalker";
import { RouteWalkerListener } from "./RouteWalkerListener";

export class RouteVisualizerAdapter extends RouteWalkerListener {

    private readonly routeWalker: RouteWalker;
    private readonly graphService: GraphService;

    constructor(routeWalker: RouteWalker, graphService: GraphService) {
        super();

        this.routeWalker = routeWalker;
        this.graphService = graphService;
    }

    onDestinationPointChanged() {
        this.routeWalker.getRoute().meshes.forEach(mesh => mesh.dispose());
        this.graphService.getVisualizer().visualizeRoute(this.routeWalker.getRoute());
    }
}