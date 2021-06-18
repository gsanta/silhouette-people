import { InjectProperty } from "../../di/diDecorators";
import { HumanController } from "../../model/item/character/states/HumanController";
import { GameObject } from "../../model/objects/game_object/GameObject";
import { RotationRestrictorAdapter } from "../../model/item/route/adapters/rotation/RotationRestrictorAdapter";
import { ReversingRouter } from "../../model/item/route/adapters/routing/ReversingRouter";
import { RouterAdapter } from "../../model/item/route/adapters/routing/RouterAdapter";
import { ActiveEdgeUpdaterAdapter } from "../../model/item/route/adapters/walking/ActiveEdgeUpdaterAdapter";
import { RouteControllerImpl } from "../../model/objects/game_object/controller_route/RouteControllerImpl";
import { RouteControllerListenerDecorator } from "../../model/objects/game_object/controller_route/RouteControllerListenerDecorator";
import { CitizenStore } from "../../store/CitizenStore";
import { MaterialStore } from "../../store/MaterialStore";
import { RouteStore } from "../../store/RouteStore";
import { ToolService } from "../edit/ToolService";
import { GraphService } from "../graph/GraphService";
import { lookup } from "../Lookup";
import { CollisionAvoidanceAdapter } from "../motion/collision/CollisionAvoidanceAdapter";
import { WorldProvider } from "../WorldProvider";
import { CitizenExecutor } from "./CitizenExecutor";
import { RoutePool } from "./RoutePool";

export class CitizenSetup {

    @InjectProperty('ToolService')
    private toolService: ToolService;

    @InjectProperty('WorldProvider')
    private worldProvider: WorldProvider;

    @InjectProperty('RouteStore')
    private routeStore: RouteStore;
    
    @InjectProperty('MaterialStore')
    private materialStore: MaterialStore;

    @InjectProperty('CitizenStore')
    private citizenStore: CitizenStore;

    private readonly routePool: RoutePool;
    private readonly citizenExecutor: CitizenExecutor;
    private readonly graphService: GraphService;

    constructor(graphService: GraphService) {
        this.worldProvider = lookup.worldProvider;
        this.toolService = lookup.toolService;
        this.routeStore = lookup.routeStore;
        this.materialStore = lookup.materialStore;
        this.citizenStore = lookup.citizenStore;
        this.graphService = graphService;

        this.routePool = new RoutePool();
        this.citizenExecutor = new CitizenExecutor(this.citizenStore, this.routePool, this.routeStore, this.worldProvider, this.materialStore)
    }

    async setup() {
        // const char1 = this.setupCitizen1();
        // this.applyDebugAttachments(char1);
        // const char2 = this.setupCitizen2();
        // this.applyDebugAttachments(char2);

        // this.toolService.execute.addRouteExecutor(this.citizenExecutor);
    }

    private setupCitizen1(): GameObject {
        const character = this.citizenStore.getById('C');
        const route = this.routeStore.getById('route-1');

        character.motionController = new HumanController(character);
        character.motionController.setSpeed(1);

        const walker = new RouteControllerListenerDecorator(new RouteControllerImpl(route, character));

        character.routeController = walker;
        
        walker.addListener(new ActiveEdgeUpdaterAdapter(walker));
        walker.addListener(new RotationRestrictorAdapter(walker));
        walker.addListener(new RouterAdapter(new ReversingRouter(walker)));
        walker.addListener(new CollisionAvoidanceAdapter(walker, this.citizenStore));

        return character;
    }

    private setupCitizen2(): GameObject {
        const character = this.citizenStore.getById('C2');
        const route = this.routeStore.getById('route-1').reverse();

        character.motionController = new HumanController(character);
        character.motionController.setSpeed(1);

        const walker = new RouteControllerListenerDecorator(new RouteControllerImpl(route, character));

        character.routeController = walker;
        
        walker.addListener(new ActiveEdgeUpdaterAdapter(walker));
        walker.addListener(new RotationRestrictorAdapter(walker));
        walker.addListener(new RouterAdapter(new ReversingRouter(walker)));

        return character;
    }

    private applyDebugAttachments(character: GameObject) {
        // character.addAttachment(new CollisionRadiusVisualizerAttachment(character, this.worldProvider));
        // character.addAttachment(new CollisionVecVisualizerAttachment(character, this.worldProvider));
    }
}