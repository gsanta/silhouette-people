import { CharacterItem } from "../../model/item/character/CharacterItem";
import { ActiveEdgeUpdaterAdapter } from "../../model/item/route/adapters/walking/ActiveEdgeUpdaterAdapter";
import { DirectionRestrictorAdapter } from "../../model/item/route/adapters/rotation/RotationRestrictorAdapter";
import { DynamicRouter } from "../../model/item/route/adapters/routing/DynamicRouter";
import { RouteVisualizerAdapter } from "../../model/item/route/adapters/visualization/RouteVisualizerAdapter";
import { RouteWalkerImpl } from "../../model/item/route/RouteWalkerImpl";
import { RouteWalkerListenerDecorator } from "../../model/item/route/RouteWalkerListenerDecorator";
import { MaterialStore } from "../../store/MaterialStore";
import { GraphService } from "../graph/GraphService";
import { WorldProvider } from "../WorldProvider";
import { PlayerParser } from "./PlayerParser";
import { PlayerStore } from "./PlayerStore";
import { DynamicRouterAdapter } from "../../model/item/route/adapters/routing/DynamicRouterAdapter";
import { GraphImpl } from "../graph/GraphImpl";

export class PlayerSetup {

    private readonly worldProvider: WorldProvider;
    private readonly playerStore: PlayerStore;
    private readonly graphService: GraphService;
    private readonly materialStore: MaterialStore;

    private readonly playerParser: PlayerParser;

    constructor(worldProvider: WorldProvider, playerStore: PlayerStore, graphService: GraphService, materialStore: MaterialStore) {
        this.worldProvider = worldProvider;
        this.playerStore = playerStore;
        this.graphService = graphService;
        this.materialStore = materialStore;
        this.playerParser = new PlayerParser(this.graphService);
    }

    setup() {
        const player = this.playerStore.getActivePlayer();
        const route = this.playerParser.parse(this.worldProvider.worldMap);

        route.character = <CharacterItem> player.getParent();
        player.route = route;

        const graph = this.graphService.getGraph();
        const walker = new RouteWalkerImpl(route);
        const walkerDecorator = new RouteWalkerListenerDecorator(walker);

        route.walker = walkerDecorator;

        walkerDecorator.addListener(new ActiveEdgeUpdaterAdapter(walkerDecorator));
        walkerDecorator.addListener(new DirectionRestrictorAdapter(route.walker));
        walkerDecorator.addListener(new DynamicRouterAdapter(route.walker, graph));
        walkerDecorator.addListener(new RouteVisualizerAdapter(walkerDecorator, this.graphService));
    }
}