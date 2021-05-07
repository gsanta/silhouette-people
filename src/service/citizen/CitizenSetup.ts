import { InjectProperty } from "../../di/diDecorators";
import { CharacterObj } from "../../model/object/character/CharacterObj";
import { CitizenStore } from "../../store/CitizenStore";
import { EventService } from "../base/EventService";
import { lookup } from "../Lookup";
import { MeshFactory } from "../object/mesh/MeshFactory";
import { RouteFactory } from "../object/route/RouteFactory";
import { RouteMapParser } from "../object/route/RouteMapParser";
import { WorldMapParser } from "../object/world/WorldMapParser";
import { WorldProvider } from "../object/world/WorldProvider";
import { CitizenFactory } from "./CitizenFactory";
import { RoutePool } from "./RoutePool";

export class CitizenSetup {

    private readonly routePool: RoutePool;
    private readonly worldMapParser: WorldMapParser;
    private readonly citizenFactory: CitizenFactory;
    private readonly citizenStore: CitizenStore;

    constructor(worldMapParser: WorldMapParser, worldProvider: WorldProvider, meshFactory: MeshFactory, citizenStore: CitizenStore) {
        this.routePool = new RoutePool();
        this.citizenFactory = new CitizenFactory(meshFactory, worldProvider);
        this.worldMapParser = worldMapParser;
        this.citizenStore = citizenStore;
    }

    async setup() {
        const { routeParser } = this.worldMapParser;

        routeParser.getRoutes().forEach(route => this.routePool.addRoute(route));

        const citizen = await this.citizenFactory.create();
        this.citizenStore.addObj(<CharacterObj> citizen);

        this.routePool.getRoute();
    }
}