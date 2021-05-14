import { CharacterItem } from "../../model/item/character/CharacterItem";
import { DynamicRoutePointProvider } from "../../model/item/route/DynamicRoutePointProvider";
import { LockedDirection } from "../../model/item/route/features/LockedDirection";
import { RouteWalker } from "../../model/item/route/RouteWalker";
import { GraphService } from "../graph/GraphService";
import { WorldProvider } from "../WorldProvider";
import { PlayerParser } from "./PlayerParser";
import { PlayerStore } from "./PlayerStore";

export class PlayerSetup {

    private readonly worldProvider: WorldProvider;
    private readonly playerStore: PlayerStore;
    private readonly graphService: GraphService;

    private readonly playerParser: PlayerParser;

    constructor(worldProvider: WorldProvider, playerStore: PlayerStore, graphService: GraphService) {
        this.worldProvider = worldProvider;
        this.playerStore = playerStore;
        this.graphService = graphService;
        this.playerParser = new PlayerParser(this.graphService);
    }

    setup() {
        const player = this.playerStore.getActivePlayer();
        const route = this.playerParser.parse(this.worldProvider.worldMap);

        route.character = <CharacterItem> player.getParent();
        player.route = route;
        player.route.walker = new RouteWalker(route, new DynamicRoutePointProvider(this.graphService.getGraph()));
        route.walker.addFeature(new LockedDirection(route.walker, route.character));
    }
}