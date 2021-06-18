import { RouteItem } from "../../model/objects/route/RouteItem";
import { WorldMap } from "../import/WorldMap";
import { GraphService } from "../graph/GraphService";

export class PlayerParser {
    private readonly graphService: GraphService;

    constructor(graphService: GraphService) {
        this.graphService = graphService;
    }

    parse(json: WorldMap): RouteItem {
        const [vertex1Id, vertex2Id] = json.playerRoute;
        const vertex1 = this.graphService.getGraph().getById(vertex1Id);
        const vertex2 = this.graphService.getGraph().getById(vertex2Id);

        const edge = this.graphService.getGraph().edgeBetween(vertex1, vertex2);

        return new RouteItem([edge], {});    
    }
}