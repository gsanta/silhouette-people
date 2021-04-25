import { InjectProperty } from "../di/diDecorators";
import { lookup } from "../services/Lookup";
import { WorldProvider } from "../services/WorldProvider";
import { RouteStore } from "../stores/RouteStore";
import { AbstractController } from "./IController";

export class RouteController extends AbstractController {

    @InjectProperty("RouteStore")
    private routeStore: RouteStore;

    @InjectProperty("WorldProvider")
    private worldProvider: WorldProvider;

    constructor() {
        super();
        this.routeStore = lookup.routeStore;
        this.worldProvider = lookup.worldProvider;
    }

    beforeRender() {
        // const deltaTime = this.worldProvider.world.engine.getDeltaTime();
    
        // this.routeStore.getRoutes()
        //     .filter(route => !route.walker.isFinished())
        //     .forEach(route => route.walker.step(deltaTime));
    }
}