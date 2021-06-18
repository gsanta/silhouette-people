import { CitizenStore } from "../../store/CitizenStore";
import { MaterialStore } from "../../store/MaterialStore";
import { RouteStore } from "../../store/RouteStore";
import { RouteExecutor } from "../edit/execution/RouteExecutor";
import { RouteVisualizer } from "../../model/item/route/adapters/visualization/RouteVisualizer";
import { WorldProvider } from "../WorldProvider";
import { RoutePool } from "./RoutePool";
import { GameObject } from "../../model/objects/game_object/GameObject";

export class CitizenExecutor implements RouteExecutor {

    private routeStore: RouteStore;
    private citizenStore: CitizenStore;
    private routePool: RoutePool;
    private pathVisualizer: RouteVisualizer;

    private activeCitizens: GameObject[] = [];

    constructor(citizenStore: CitizenStore, routePool: RoutePool, routeStore: RouteStore, worldProvider: WorldProvider, materialStore: MaterialStore) {
        this.routeStore = routeStore;
        this.routePool = routePool;
        this.citizenStore = citizenStore;
        this.pathVisualizer = new RouteVisualizer(worldProvider, materialStore);
    }

    updateRoutes(deltaTime: number) {
        // this.deleteFinishedCitizens();
        // this.updateRouteWalkers(deltaTime);
        this.updateWalkers(deltaTime);
    }

    startRoutes() {
        this.activeCitizens = this.citizenStore.getAll().filter(citizen => citizen.routeController);
        this.activeCitizens.forEach(citizen => citizen.routeController.setStarted(true))
    }

    private initRoutesIfNeeded() {
    }

    private updateRouteWalkers(deltaTime: number) {
        // const citizens =  this.citizenStore.getAll();
        // citizens.forEach(citizen => {
        //     const route = this.routeStore.getRouteForCharacter(citizen);

        //     if (route) {
        //         route.walker.walk(deltaTime);        
        //     } 
        // });
    }

    private updateWalkers(deltaTime: number) {
        this.activeCitizens.forEach(player => player.routeController.update(deltaTime));
        this.activeCitizens.forEach(citizen => citizen.motionController.update(deltaTime));
        this.activeCitizens.forEach(citizen => citizen.stateController.state.update(deltaTime));
    }

    private deleteFinishedCitizens() {
        const citizens =  this.citizenStore.getAll();

        citizens.forEach(citizen => {
            // const route = this.routeStore.getRouteForCharacter(citizen);
            // if (route && route.walker.getState() === RouteWalkerState.FINISHED) {
            //     this.citizenStore.removeItem(citizen);

            // }
        });
    }
}