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
import { RouteParser } from "../base/import/map/RouteParser";
import { WorldImporter } from "../base/import/WorldImporter";
import { WorldProvider } from "../WorldProvider";
import { CitizenExecutor } from "./CitizenExecutor";
import { CitizenFactory } from "./CitizenFactory";
import { RoutePool } from "./RoutePool";
import { GraphService } from "../graph/GraphService";
import { RouteWalkerListenerDecorator } from "../../model/item/route/RouteWalkerListenerDecorator";
import { RouteWalkerImpl } from "../../model/item/route/RouteWalkerImpl";
import { ActiveEdgeUpdaterAdapter } from "../../model/item/route/adapters/walking/ActiveEdgeUpdaterAdapter";
import { RotationRestrictorAdapter } from "../../model/item/route/adapters/rotation/RotationRestrictorAdapter";
import { CharacterMover } from "../../model/item/character/states/CharacterMover";
import { RouterAdapter } from "../../model/item/route/adapters/routing/RouterAdapter";
import { ReversingRouter } from "../../model/item/route/adapters/routing/ReversingRouter";
import { CollisionSensorAdapter } from "../../model/item/route/adapters/collision/CollisionSensorAdapter";

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

    private readonly worldMapParser: WorldImporter;

    private readonly routePool: RoutePool;
    private readonly citizenFactory: CitizenFactory;
    private readonly citizenExecutor: CitizenExecutor;
    private readonly graphService: GraphService;

    constructor(worldMapParser: WorldImporter, graphService: GraphService) {
        this.worldProvider = lookup.worldProvider;
        this.toolService = lookup.toolService;
        this.meshFactory = lookup.meshFactory;
        this.routeStore = lookup.routeStore;
        this.materialStore = lookup.materialStore;
        this.citizenStore = lookup.citizenStore;
        this.graphService = graphService;
        this.worldMapParser = worldMapParser;

        this.routePool = new RoutePool();
        this.citizenFactory = new CitizenFactory(this.meshFactory, this.worldProvider);
        this.citizenExecutor = new CitizenExecutor(this.citizenStore, this.routePool, this.routeStore, this.worldProvider, this.materialStore)
    }

    async setup() {
        this.setupCitizen1();
        this.setupCitizen2();

        this.toolService.execute.addRouteExecutor(this.citizenExecutor);
    }

    private setupCitizen1() {
        const character = this.citizenStore.getById('C');
        const route = this.routeStore.getById('route-1');

        character.mover = new CharacterMover(character);
        character.mover.setSpeed(1);

        const graph = this.graphService.getGraph();
        const walker = new RouteWalkerListenerDecorator(new RouteWalkerImpl(route, character));

        character.routeWalker = walker;
        
        walker.addListener(new ActiveEdgeUpdaterAdapter(walker));
        walker.addListener(new RotationRestrictorAdapter(walker));
        walker.addListener(new RouterAdapter(new ReversingRouter(walker)));
        walker.addListener(new CollisionSensorAdapter(walker, this.citizenStore))
    }

    private setupCitizen2() {
        const character = this.citizenStore.getById('C2');
        const route = this.routeStore.getById('route-1').reverse();

        character.mover = new CharacterMover(character);
        character.mover.setSpeed(1);

        const graph = this.graphService.getGraph();
        const walker = new RouteWalkerListenerDecorator(new RouteWalkerImpl(route, character));

        character.routeWalker = walker;
        
        walker.addListener(new ActiveEdgeUpdaterAdapter(walker));
        walker.addListener(new RotationRestrictorAdapter(walker));
        walker.addListener(new RouterAdapter(new ReversingRouter(walker)));
    }
}