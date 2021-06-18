import { CitizenStore } from "../../store/CitizenStore";
import { MaterialStore } from "../../store/MaterialStore";
import { RouteVisualizer } from "../../model/objects/route/visualization/RouteVisualizer";
import { WorldProvider } from "../WorldProvider";

export class CitizenRouteDebugger {

    private readonly worldProvider: WorldProvider;
    private readonly materialStore: MaterialStore;
    private readonly citizenStore: CitizenStore;
    private visualizers: RouteVisualizer[] = [];

    constructor(worldProvider: WorldProvider, materialStore: MaterialStore, citizenStore: CitizenStore) {
        this.worldProvider = worldProvider;
        this.materialStore = materialStore;
        this.citizenStore = citizenStore;
    }

    visualize() {
        this.citizenStore.getAll().forEach(citizen => {
            if (citizen.routeController) {
                const visualizer = new RouteVisualizer(this.worldProvider, this.materialStore);
                this.visualizers.push(visualizer);
                visualizer.visualize(citizen.routeController.getRoute());
            }
        });
    }

    dispose() {
        // this.visualizers.forEach(visualizer => visualizer)
    }
}