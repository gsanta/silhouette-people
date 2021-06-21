import { ActiveEdgeUpdaterAdapter } from "../../model/objects/route/edge_update/ActiveEdgeUpdaterAdapter";
import { RotationRestrictorAdapter } from "../../model/objects/route/rotation/RotationRestrictorAdapter";
import { RouteVisualizerAdapter } from "../../model/objects/route/visualization/RouteVisualizerAdapter";
import { RouteControllerImpl } from "../../model/objects/game_object/controller_route/RouteControllerImpl";
import { RouteControllerListenerDecorator } from "../../model/objects/game_object/controller_route/RouteControllerListenerDecorator";
import { GraphService } from "../graph/GraphService";
import { WorldProvider } from "../WorldProvider";
import { PlayerParser } from "./PlayerParser";
import { PlayerStore } from "./PlayerStore";
import { RouterAdapter } from "../../model/objects/route/routing/RouterAdapter";
import { BikeParenter } from "../setup/BikeParenter";
import { KeyboardService } from "../input/KeyboardService";
import { BikeInputController } from "../../model/objects/game_object/types/bike/BikeInputController";
import { BikeController } from "../../model/objects/game_object/types/bike/BikeController";
import { DynamicRouter } from "../../model/objects/route/routing/DynamicRouter";
import { GameObject } from "../../model/objects/game_object/GameObject";
import { FogOfWar } from "../fow/FogOfWar";
import { ActivePlayerService } from "../ActivePlayerService";
import { ISetup } from "../setup/ISetup";
import { MaterialStore } from "../../store/MaterialStore";

export class PlayerSetup implements ISetup {

    private readonly worldProvider: WorldProvider;
    private readonly playerStore: PlayerStore;
    private readonly graphService: GraphService;
    private readonly bikeParenter: BikeParenter;
    private readonly keyboardService: KeyboardService;
    private readonly activePlayerService: ActivePlayerService;
    private readonly materialStore: MaterialStore;

    private readonly playerParser: PlayerParser;
    private fogOfWar: FogOfWar;

    constructor(
        worldProvider: WorldProvider,
        playerStore: PlayerStore,
        graphService: GraphService,
        keyboardService: KeyboardService,
        activePlayerService: ActivePlayerService,
        mateiralStore: MaterialStore
    ) {
        this.worldProvider = worldProvider;
        this.playerStore = playerStore;
        this.graphService = graphService;
        this.keyboardService = keyboardService;
        this.activePlayerService = activePlayerService;
        this.materialStore = mateiralStore;
        this.playerParser = new PlayerParser(this.graphService);
        this.bikeParenter = new BikeParenter();
    }

    async setup(): Promise<void> {
        const player = this.playerStore.getActivePlayer();
        this.activePlayerService.activate(player);

        if (!this.fogOfWar) {
            this.fogOfWar = new FogOfWar(this.worldProvider.scene, player);
        }

        player.addBehaviour(this.fogOfWar);
        const route = this.playerParser.parse(this.worldProvider.worldMap);

        this.bikeParenter.parentToBike(player, this.playerStore.getBikes()[0]);

        const graph = this.graphService.getGraph();
        const walker = new RouteControllerListenerDecorator(new RouteControllerImpl(route, <GameObject> player.getParent()));

        player.routeController = walker;
        
        walker.addListener(new ActiveEdgeUpdaterAdapter(walker));
        walker.addListener(new RotationRestrictorAdapter(walker));
        walker.addListener(new RouterAdapter(new DynamicRouter(walker, graph)));
        walker.addListener(new RouteVisualizerAdapter(walker, this.graphService, this.materialStore));
        
        const bike = <GameObject> player.getParent();
        player.inputController = new BikeInputController(<BikeController> player.motionController, player, this.keyboardService, this.graphService);
        bike.inputController = player.inputController;
    
        player.routeController.setStarted(true);
    }
}