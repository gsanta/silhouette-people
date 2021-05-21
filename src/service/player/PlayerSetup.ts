import { CharacterItem } from "../../model/item/character/CharacterItem";
import { ActiveEdgeUpdaterAdapter } from "../../model/item/route/adapters/walking/ActiveEdgeUpdaterAdapter";
import { DirectionRestrictorAdapter } from "../../model/item/route/adapters/rotation/RotationRestrictorAdapter";
import { RouteVisualizerAdapter } from "../../model/item/route/adapters/visualization/RouteVisualizerAdapter";
import { RouteWalkerImpl } from "../../model/item/route/RouteWalkerImpl";
import { RouteWalkerListenerDecorator } from "../../model/item/route/RouteWalkerListenerDecorator";
import { GraphService } from "../graph/GraphService";
import { WorldProvider } from "../WorldProvider";
import { PlayerParser } from "./PlayerParser";
import { PlayerStore } from "./PlayerStore";
import { DynamicRouterAdapter } from "../../model/item/route/adapters/routing/DynamicRouterAdapter";
import { BikeParenter } from "../base/setup/BikeParenter";
import { KeyboardService } from "../base/keyboard/KeyboardService";
import { BikeInputManager } from "../../model/item/bike/BikeInputManager";
import { BikeWalker } from "../../model/item/bike/states/BikeWalker";

export class PlayerSetup {

    private readonly worldProvider: WorldProvider;
    private readonly playerStore: PlayerStore;
    private readonly graphService: GraphService;
    private readonly bikeParenter: BikeParenter;
    private readonly keyboardService: KeyboardService;

    private readonly playerParser: PlayerParser;

    constructor(worldProvider: WorldProvider, playerStore: PlayerStore, graphService: GraphService, keyboardService: KeyboardService) {
        this.worldProvider = worldProvider;
        this.playerStore = playerStore;
        this.graphService = graphService;
        this.playerParser = new PlayerParser(this.graphService);
        this.bikeParenter = new BikeParenter();
        this.keyboardService = keyboardService;
    }

    setup() {
        const player = this.playerStore.getActivePlayer();
        const route = this.playerParser.parse(this.worldProvider.worldMap);

        this.bikeParenter.parentToBike(player, this.playerStore.getBikes()[0], this.keyboardService, this.graphService);

        const graph = this.graphService.getGraph();
        const walker = new RouteWalkerListenerDecorator(new RouteWalkerImpl(route, <CharacterItem> player.getParent()));

        player.routeWalker = walker;
        
        walker.addListener(new ActiveEdgeUpdaterAdapter(walker));
        walker.addListener(new DirectionRestrictorAdapter(walker));
        walker.addListener(new DynamicRouterAdapter(walker, graph));
        walker.addListener(new RouteVisualizerAdapter(walker, this.graphService));

        player.inputManager = new BikeInputManager(<BikeWalker> player.walker, player, this.keyboardService, this.graphService);
        (<CharacterItem> player.getParent()).inputManager = player.inputManager;
    }
}