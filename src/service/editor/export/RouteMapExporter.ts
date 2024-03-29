import { EdgeDirection } from "../../graph/GraphEdge";
import { GraphService } from "../../graph/GraphService";
import { EdgeJson, RouteMapJson } from "../../import/RouteMapImporter";


export class RouteMapExporter {

    private readonly graphService: GraphService;

    constructor(graphService: GraphService) {
        this.graphService = graphService;
    }

    export(): RouteMapJson {
        const graph = this.graphService.getGraph();

        const vertexArr = Array.from(graph.vertices)

        const vertices: {x: number, y: number, id: string}[] = vertexArr.map(vertex => {
            return {
                x: vertex.p.x,
                y: vertex.p.z,
                id: vertex.id
            }
        });

        const edges: EdgeJson[] = Array.from(graph.edges).map(edge => {
            return {
                v1: vertexArr.indexOf(edge.v1),
                v2: vertexArr.indexOf(edge.v2),
                thickness: edge.thickness,
                color: edge.color,
                direction: EdgeDirection.getEnumDirection(edge),
                internalControlPoints: edge.shape.internalControlPoints.map(p => ({x: p.x, y: p.y, z: p.z}))
            }
        });

        return {
            vertices,
            edges
        }
    }
}