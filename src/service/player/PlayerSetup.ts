import { BikeItem, CharacterItem } from "../../model/item/character/CharacterItem";
import { ActiveEdgeUpdaterAdapter } from "../../model/item/route/adapters/walking/ActiveEdgeUpdaterAdapter";
import { RotationRestrictorAdapter } from "../../model/item/route/adapters/rotation/RotationRestrictorAdapter";
import { RouteVisualizerAdapter } from "../../model/item/route/adapters/visualization/RouteVisualizerAdapter";
import { RouteWalkerImpl } from "../../model/item/route/RouteWalkerImpl";
import { RouteWalkerListenerDecorator } from "../../model/item/route/RouteWalkerListenerDecorator";
import { GraphService } from "../graph/GraphService";
import { WorldProvider } from "../WorldProvider";
import { PlayerParser } from "./PlayerParser";
import { PlayerStore } from "./PlayerStore";
import { RouterAdapter } from "../../model/item/route/adapters/routing/RouterAdapter";
import { BikeParenter } from "../base/setup/BikeParenter";
import { KeyboardService } from "../base/keyboard/KeyboardService";
import { BikeInputManager } from "../../model/item/bike/BikeInputManager";
import { BikeMover } from "../../model/item/bike/states/BikeMover";
import { DynamicRouter } from "../../model/item/route/adapters/routing/DynamicRouter";
import { CollisionSensor } from "../../model/item/route/adapters/collision/CollisionSensor";
import { CitizenStore } from "../../store/CitizenStore";
import { CollisionSensorAdapter } from "../../model/item/route/adapters/collision/CollisionSensorAdapter";

export class PlayerSetup {

    private readonly worldProvider: WorldProvider;
    private readonly playerStore: PlayerStore;
    private readonly graphService: GraphService;
    private readonly bikeParenter: BikeParenter;
    private readonly keyboardService: KeyboardService;
    private readonly citizenStore: CitizenStore;

    private readonly playerParser: PlayerParser;

    constructor(worldProvider: WorldProvider, playerStore: PlayerStore, graphService: GraphService, keyboardService: KeyboardService, citizenStore: CitizenStore) {
        this.worldProvider = worldProvider;
        this.playerStore = playerStore;
        this.graphService = graphService;
        this.playerParser = new PlayerParser(this.graphService);
        this.bikeParenter = new BikeParenter();
        this.keyboardService = keyboardService;
        this.citizenStore = citizenStore;
    }

    setup() {
        const player = this.playerStore.getActivePlayer();
        const route = this.playerParser.parse(this.worldProvider.worldMap);

        this.bikeParenter.parentToBike(player, this.playerStore.getBikes()[0], this.keyboardService, this.graphService);

        const graph = this.graphService.getGraph();
        const walker = new RouteWalkerListenerDecorator(new RouteWalkerImpl(route, <CharacterItem> player.getParent()));

        player.routeWalker = walker;
        
        walker.addListener(new ActiveEdgeUpdaterAdapter(walker));
        walker.addListener(new RotationRestrictorAdapter(walker));
        walker.addListener(new RouterAdapter(new DynamicRouter(walker, graph)));
        walker.addListener(new RouteVisualizerAdapter(walker, this.graphService));
        walker.addListener(new CollisionSensorAdapter(walker, this.citizenStore));
        
        const bike = <BikeItem> player.getParent();
        bike.inputManager = player.inputManager;
        player.inputManager = new BikeInputManager(<BikeMover> player.mover, bike, player, this.keyboardService, this.graphService);
    }
}