import { CitizenStore } from "../../../store/CitizenStore";
import { MaterialStore } from "../../../store/MaterialStore";
import { PathVisualizer } from "../../edit/route/PathVisualizer";
import { WorldProvider } from "../../WorldProvider";

export class CitizenRouteDebugger {

    private readonly worldProvider: WorldProvider;
    private readonly materialStore: MaterialStore;
    private readonly citizenStore: CitizenStore;
    private visualizers: PathVisualizer[] = [];

    constructor(worldProvider: WorldProvider, materialStore: MaterialStore, citizenStore: CitizenStore) {
        this.worldProvider = worldProvider;
        this.materialStore = materialStore;
        this.citizenStore = citizenStore;
    }

    visualize() {
        this.citizenStore.getAll().forEach(citizen => {
            if (citizen.route) {
                const visualizer = new PathVisualizer(this.worldProvider, this.materialStore);
                this.visualizers.push(visualizer);
                visualizer.visualize(citizen.route.path);
            }
        });
    }

    dispose() {
        // this.visualizers.forEach(visualizer => visualizer)
    }
}