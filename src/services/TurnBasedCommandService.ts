import { InjectProperty } from "../di/diDecorators";
import { MeshStore } from "../stores/MeshStore";
import { RouteStore } from "../stores/RouteStore";
import { lookup } from "./Lookup";

export class TurnBasedCommandService {

    @InjectProperty("RouteStore")
    private routeStore: RouteStore;

    @InjectProperty("MeshStore")
    private meshStore: MeshStore;


    constructor() {
        this.routeStore = lookup.routeStore;
        this.meshStore = lookup.meshStore;
    }

    executeTurn() {
        const player = this.meshStore.getActivePlayer();
        
        const route = this.routeStore.getRouteForCharacter(player);
        if (route) {
            route.walker.setStarted();
        }
    }
}