import { Color3, StandardMaterial } from "babylonjs";
import { MaterialStore } from "../../../store/MaterialStore";
import { RouteStore } from "../../../store/RouteStore";
import { EdgeColor } from "../../graph/GraphEdge";
import { SceneService } from "../../SceneService";
import { ISetup } from "../../setup/ISetup";
import { RouteFactory } from "../RouteFactory";

export class RouteSetup implements ISetup {
    private readonly routeStore: RouteStore;
    private readonly routeFactory: RouteFactory;
    private readonly materialStore: MaterialStore;
    private readonly sceneService: SceneService;

    constructor(routeStore: RouteStore, routeFactory: RouteFactory, materialStore: MaterialStore, sceneService: SceneService) {
        this.routeStore = routeStore;
        this.routeFactory = routeFactory;
        this.materialStore = materialStore;
        this.sceneService = sceneService;
    }

    async setup(): Promise<void> {
        const routes = this.routeStore.getRoutes();

        routes.forEach(route => this.routeFactory.create(route));
    }
}