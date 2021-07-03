import { RouteController } from "../../model/objects/game_object/controller_route/RouteController";
import { RouteControllerImpl } from "../../model/objects/game_object/controller_route/RouteControllerImpl";
import { RouteControllerListenerDecorator } from "../../model/objects/game_object/controller_route/RouteControllerListenerDecorator";
import { GameObject } from "../../model/objects/game_object/GameObject";
import { BikeController } from "../../model/objects/game_object/types/bike/BikeController";
import { BikeIdleState } from "../../model/objects/game_object/types/bike/states/BikeIdleState";
import { HumanController } from "../../model/objects/game_object/types/human/HumanController";
import { ActiveEdgeUpdaterAdapter } from "../../model/objects/route/edge_update/ActiveEdgeUpdaterAdapter";
import { RotationRestrictorAdapter } from "../../model/objects/route/rotation/RotationRestrictorAdapter";
import { RouteItem, RouteJson } from "../../model/objects/route/RouteItem";
import { DynamicRouter } from "../../model/objects/route/routing/DynamicRouter";
import { ReversingRouter } from "../../model/objects/route/routing/ReversingRouter";
import { RouterAdapter } from "../../model/objects/route/routing/RouterAdapter";
import { RouteVisualizerAdapter } from "../../model/objects/route/visualization/RouteVisualizerAdapter";
import { GameObjectStore } from "../../store/GameObjectStore";
import { RouteStore } from "../../store/RouteStore";
import { GraphEdge } from "../graph/GraphEdge";
import { GraphImpl, GraphVertex } from "../graph/GraphImpl";
import { GraphService } from "../graph/GraphService";
import { ShortestPath } from "../graph/ShortestPath";


export class RouteFactory {
    private readonly gameObjectStore: GameObjectStore;
    private readonly routeStore: RouteStore;
    private readonly graphService: GraphService;

    private readonly shortestPath: ShortestPath<GraphVertex>;

    constructor(gameObjectStore: GameObjectStore, routeStore: RouteStore, graphService: GraphService) {
        this.gameObjectStore = gameObjectStore;
        this.routeStore = routeStore;
        this.graphService = graphService;

        this.shortestPath = new ShortestPath();
    }
    // createRouteController(route: RouteItem, character: GameObject): RouteController {
    //     const walker = new RouteControllerListenerDecorator(new RouteControllerImpl(route, character));
        
    //     walker.addListener(new ActiveEdgeUpdaterAdapter(walker));
    //     walker.addListener(new RotationRestrictorAdapter(walker));
    //     walker.addListener(new RouterAdapter(new DynamicRouter(walker, graph)));
    //     walker.addListener(new RouteVisualizerAdapter(walker, this.graphService));
    // }

    create(routeJson: RouteJson) {
        const graph = this.graphService.getGraph();
        const character = this.gameObjectStore.getById(routeJson.gameObjectId);
        const v1 = graph.getById(routeJson.fromVertex);
        const v2 = graph.getById(routeJson.toVertex);

        const motionController = new BikeController(character)
        character.motionController = motionController;
        motionController.pedalling = true;

        character.stateController.state = new BikeIdleState(character, <BikeController> character.motionController);


        const routeEdges = this.createRoute(v1, v2);
        const route = new RouteItem(routeEdges);
        const walker = new RouteControllerListenerDecorator(new RouteControllerImpl(route, character));

        character.routeController = walker;
        
        walker.addListener(new ActiveEdgeUpdaterAdapter(walker));
        walker.addListener(new RotationRestrictorAdapter(walker));
        walker.addListener(new RouterAdapter(new ReversingRouter(walker)));

        character.routeController.setStarted(true);
    }

    private createRoute(fromVertex: GraphVertex, toVertex: GraphVertex): GraphEdge[] {
        const graph = this.graphService.getGraph();
        const routeVertices = this.shortestPath.path(fromVertex, toVertex, this.graphService.getGraph());
        const routeEdges: GraphEdge[] = [];

        if (routeVertices) {
            for (let i = 0; i < routeVertices.length - 1; i++) {
                routeEdges.push(graph.edgeBetween(routeVertices[i], routeVertices[i + 1]));
            }
        }

        return routeEdges;
    }
}