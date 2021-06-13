import { RouteItem } from "../../../model/objects/route/RouteItem";
import { RouteStore } from "../../../store/RouteStore";
import { GraphParser } from "../../base/import/map/parse/GraphParser";
import { GraphService } from "../../graph/GraphService";
import { WorldProvider } from "../../WorldProvider";

export class RouteSetup {
    private readonly worldProvider: WorldProvider;
    private readonly graphParser: GraphParser;
    private readonly graphService: GraphService;
    private readonly routeStore: RouteStore;

    constructor(worldProvider: WorldProvider, graphService: GraphService, routeStore: RouteStore) {
        this.worldProvider = worldProvider;
        this.graphService = graphService;
        this.routeStore = routeStore;
        this.graphParser = new GraphParser();
    }

    setup() {
        const graph = this.graphParser.parse(this.worldProvider.worldMap);
        this.graphService.setGraph(graph);

        this.routeStore.addRoute(this.createRoute1());
    }
    
    private createRoute1(): RouteItem {
        const vertex1 = this.graphService.getGraph().getById('A2');
        const vertex2 = this.graphService.getGraph().getById('A3');
        const vertex3 = this.graphService.getGraph().getById('A4');

        const edge1 = this.graphService.getGraph().edgeBetween(vertex1, vertex2);
        const edge2 = this.graphService.getGraph().edgeBetween(vertex2, vertex3);

        return new RouteItem([edge1, edge2], { id: 'route-1' });
    }
}