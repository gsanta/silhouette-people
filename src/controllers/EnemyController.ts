import { InjectProperty } from "../di/diDecorators";
import { RouteFactory } from "../services/factory/RouteFactory";
import { lookup } from "../services/Lookup";
import { WorldProvider } from "../services/WorldProvider";
import { MeshStore } from "../stores/MeshStore";
import { RouteStore } from "../stores/RouteStore";
import { AbstractController, ControllerType } from "./IController";

export class EnemyController extends AbstractController {
    type = ControllerType.Enemy;

    @InjectProperty("RouteStore")
    private routeStore: RouteStore;

    @InjectProperty("MeshStore")
    private meshStore: MeshStore;

    @InjectProperty("RouteFactory")
    private routeFactory: RouteFactory;

    @InjectProperty("WorldProvider")
    private worldProvider: WorldProvider;

    constructor() {
        super();
        this.routeStore = lookup.routeStore;
        this.meshStore = lookup.meshStore;
        this.routeFactory = lookup.routeFactory;
        this.worldProvider = lookup.worldProvider;
    }


    beforeRender() {
        const deltaTime = this.worldProvider.world.engine.getDeltaTime();
        const finishedRoutes = this.routeStore.getFinishedRoutes();

        finishedRoutes.forEach(route => {
            this.routeStore.addRoute(this.routeFactory.createRandomRoute(route.character));
        });

        this.routeStore.clearFinishedRoutes();

        this.routeStore.getRoutes().forEach(route => route.walker.step(deltaTime));
    }
}