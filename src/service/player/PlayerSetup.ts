import { ActiveEdgeUpdaterAdapter } from "../../model/item/route/adapters/walking/ActiveEdgeUpdaterAdapter";
import { RotationRestrictorAdapter } from "../../model/item/route/adapters/rotation/RotationRestrictorAdapter";
import { RouteVisualizerAdapter } from "../../model/item/route/adapters/visualization/RouteVisualizerAdapter";
import { RouteControllerImpl } from "../../model/objects/game_object/controller_route/RouteControllerImpl";
import { RouteControllerListenerDecorator } from "../../model/objects/game_object/controller_route/RouteControllerListenerDecorator";
import { GraphService } from "../graph/GraphService";
import { WorldProvider } from "../WorldProvider";
import { PlayerParser } from "./PlayerParser";
import { PlayerStore } from "./PlayerStore";
import { RouterAdapter } from "../../model/item/route/adapters/routing/RouterAdapter";
import { BikeParenter } from "../base/setup/BikeParenter";
import { KeyboardService } from "../base/keyboard/KeyboardService";
import { BikeInputController } from "../../model/item/game_object/input/BikeInputController";
import { BikeController } from "../../model/objects/game_object/types/bike/BikeController";
import { DynamicRouter } from "../../model/item/route/adapters/routing/DynamicRouter";
import { CitizenStore } from "../../store/CitizenStore";
import { CollisionAvoidanceAdapter } from "../motion/collision/CollisionAvoidanceAdapter";
import { GameObject } from "../../model/objects/game_object/GameObject";

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

        this.bikeParenter.parentToBike(player, this.playerStore.getBikes()[0]);

        const graph = this.graphService.getGraph();
        const walker = new RouteControllerListenerDecorator(new RouteControllerImpl(route, <GameObject> player.getParent()));

        player.routeController = walker;
        
        walker.addListener(new ActiveEdgeUpdaterAdapter(walker));
        walker.addListener(new RotationRestrictorAdapter(walker));
        walker.addListener(new RouterAdapter(new DynamicRouter(walker, graph)));
        walker.addListener(new RouteVisualizerAdapter(walker, this.graphService));
        
        const bike = <GameObject> player.getParent();
        bike.inputController = player.inputController;
        player.inputController = new BikeInputController(<BikeController> player.characterController, bike, player, this.keyboardService, this.graphService);
    }
}