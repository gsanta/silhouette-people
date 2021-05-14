import { WorldProvider } from "../../../service/WorldProvider";
import { MaterialStore } from "../../../store/MaterialStore";
import { RouteVisualizer } from "./RouteVisualizer";
import { RouteWalker } from "./RouteWalker";
import { RouteWalkerListener } from "./RouteWalkerListener";

export class RouteVisualizerAdapter extends RouteWalkerListener {

    private routeVisualizer: RouteVisualizer;
    private readonly routeWalker: RouteWalker;

    constructor(routeWalker: RouteWalker, worldProvider: WorldProvider, materialStore: MaterialStore) {
        super();

        this.routeWalker = routeWalker;
        this.routeVisualizer = new RouteVisualizer(worldProvider, materialStore);
    }

    onDestinationPointChanged() {
        this.routeVisualizer.dispose();
        this.routeVisualizer.visualize(this.routeWalker.getRoute());
    }
}