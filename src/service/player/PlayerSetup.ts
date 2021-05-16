import { CharacterItem } from "../../model/item/character/CharacterItem";
import { DestinationPointUpdaterAdapter } from "../../model/item/route/DestinationPointUpdaterAdapter";
import { DirectionRestrictorAdapter } from "../../model/item/route/DirectionRestrictorAdapter";
import { DynamicRoutePointProvider } from "../../model/item/route/DynamicRoutePointProvider";
import { DirectionRestrictor } from "../../model/item/route/DirectionRestrictor";
import { RouteVisualizerAdapter } from "../../model/item/route/RouteVisualizerAdapter";
import { RouteWalkerImpl } from "../../model/item/route/RouteWalkerImpl";
import { RouteWalkerListenerDecorator } from "../../model/item/route/RouteWalkerListenerDecorator";
import { MaterialStore } from "../../store/MaterialStore";
import { GraphService } from "../graph/GraphService";
import { WorldProvider } from "../WorldProvider";
import { PlayerParser } from "./PlayerParser";
import { PlayerStore } from "./PlayerStore";

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
        // route.walker.addFeature(new DirectionRestrictor(route.walker, route));

        walkerDecorator.addListener(new DestinationPointUpdaterAdapter(walkerDecorator, new DynamicRoutePointProvider(walkerDecorator, graph)))
        walkerDecorator.addListener(new DirectionRestrictorAdapter(route.walker));
        walkerDecorator.addListener(new RouteVisualizerAdapter(walkerDecorator, this.worldProvider, this.materialStore));
    }
}