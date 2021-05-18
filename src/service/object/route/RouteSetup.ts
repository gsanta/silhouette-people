import { GraphParser } from "../../base/import/map/parse/GraphParser";
import { GraphService } from "../../graph/GraphService";
import { WorldProvider } from "../../WorldProvider";


export class RouteSetup {

    private readonly worldProvider: WorldProvider;
    private readonly graphParser: GraphParser;
    private readonly graphService: GraphService;

    constructor(worldProvider: WorldProvider, graphService: GraphService) {
        this.worldProvider = worldProvider;
        this.graphService = graphService;
        this.graphParser = new GraphParser();
    }

    setup() {
        const graph = this.graphParser.parse(this.worldProvider.worldMap);
        this.graphService.setGraph(graph);
    }
}