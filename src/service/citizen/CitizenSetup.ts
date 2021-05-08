import { InjectProperty } from "../../di/diDecorators";
import { CharacterItem } from "../../model/item/character/CharacterItem";
import { CitizenStore } from "../../store/CitizenStore";
import { MaterialStore } from "../../store/MaterialStore";
import { MeshStore } from "../../store/MeshStore";
import { RouteStore } from "../../store/RouteStore";
import { EventService } from "../base/EventService";
import { ToolService } from "../edit/ToolService";
import { lookup } from "../Lookup";
import { MeshFactory } from "../object/mesh/MeshFactory";
import { RouteFactory } from "../object/route/RouteFactory";
import { RouteMapParser } from "../object/route/RouteMapParser";
import { WorldMapParser } from "../object/world/WorldMapParser";
import { WorldProvider } from "../object/world/WorldProvider";
import { CitizenExecutor } from "./CitizenExecutor";
import { CitizenFactory } from "./CitizenFactory";
import { RoutePool } from "./RoutePool";

export class CitizenSetup {

    @InjectProperty('ToolService')
    private toolService: ToolService;

    @InjectProperty('WorldProvider')
    private worldProvider: WorldProvider;

    @InjectProperty('MeshFactory')
    private meshFactory: MeshFactory;

    @InjectProperty('RouteStore')
    private routeStore: RouteStore;
    
    @InjectProperty('MaterialStore')
    private materialStore: MaterialStore;

    @InjectProperty('CitizenStore')
    private citizenStore: CitizenStore;

    private readonly worldMapParser: WorldMapParser;

    private readonly routePool: RoutePool;
    private readonly citizenFactory: CitizenFactory;
    private readonly citizenExecutor: CitizenExecutor;

    constructor(worldMapParser: WorldMapParser) {
        this.worldProvider = lookup.worldProvider;
        this.toolService = lookup.toolService;
        this.meshFactory = lookup.meshFactory;
        this.routeStore = lookup.routeStore;
        this.materialStore = lookup.materialStore;
        this.citizenStore = lookup.citizenStore;
        this.worldMapParser = worldMapParser;

        this.routePool = new RoutePool();
        this.citizenFactory = new CitizenFactory(this.meshFactory, this.worldProvider);
        this.citizenExecutor = new CitizenExecutor(this.citizenStore, this.routePool, this.routeStore, this.worldProvider, this.materialStore)
    }

    async setup() {
        const { routeParser } = this.worldMapParser;

        routeParser.getRoutes().forEach(route => this.routePool.addRoute(route));

        this.toolService.execute.addRouteExecutor(this.citizenExecutor);

        this.routePool.getRoute();
    }
}