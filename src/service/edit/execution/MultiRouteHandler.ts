import { CharacterObj } from "../../../model/object/character/CharacterObj";
import { CitizenStore } from "../../../store/CitizenStore";
import { RouteStore } from "../../../store/RouteStore";
import { RoutePool } from "../../citizen/RoutePool";


export class CitizenRouteHandler {

    private routeStore: RouteStore;
    private citizenStore: CitizenStore;
    private routePool: RoutePool;

    constructor(citizenStore: CitizenStore, routePool: RoutePool, routeStore: RouteStore) {
        this.routeStore = routeStore;
        this.routePool = routePool;
        this.citizenStore = citizenStore;
    }

    updateRoutes(deltaTime: number) {
        
        this.initRoutesIfNeeded();
        this.deleteFinishedCitizens();
        this.updateRouteWalkers(deltaTime);
        this.updateWalkers(deltaTime);
    }

    private initRoutesIfNeeded() {
        const citizens =  this.citizenStore.getAll();

        citizens.forEach(citizen => {
            const route = this.routeStore.getRouteForCharacter(citizen);

            if (!route) {
                const route = this.routePool.getRoute();
                route.character = citizen;
                route.walker.setStarted()

                this.routeStore.addRoute(route);
            }
        });
    }

    private updateRouteWalkers(deltaTime: number) {
        const citizens =  this.citizenStore.getAll();
        citizens.forEach(citizen => {
            const route = this.routeStore.getRouteForCharacter(citizen);

            if (route) {
                route.walker.walk(deltaTime);        
            } 
        });
    }

    private updateWalkers(deltaTime: number) {
        const citizens =  this.citizenStore.getAll();

        citizens.forEach(citizen => citizen.walker.walk(deltaTime));
        citizens.forEach(citizen => citizen.animationState.update());
    }

    private deleteFinishedCitizens() {
        const citizens =  this.citizenStore.getAll();

        citizens.forEach(citizen => {
            const route = this.routeStore.getRouteForCharacter(citizen);
            if (route.walker.isFinished()) {
                this.citizenStore.delete(citizen);

            }
        });
    }
}