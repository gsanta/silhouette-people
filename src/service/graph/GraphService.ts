import { Graph } from "./Graph";
import { GraphEdge, GraphVertex } from "./GraphImpl";


export class GraphService {
    private graph: Graph<GraphVertex, GraphEdge>;

    setGraph(graph: Graph<GraphVertex, GraphEdge>) {
        this.graph = graph;
    }

    getGraph(): Graph<GraphVertex, GraphEdge> {
        return this.graph;
    }
}