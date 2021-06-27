import { MaterialStore } from "../../store/MaterialStore";
import { SceneService } from "../SceneService";
import { Graph } from "./Graph";
import { GraphEdge } from "./GraphEdge";
import { GraphVertex } from "./GraphImpl";
import { GraphEdgeVisualizer } from "./GraphEdgeVisualizer";

export class GraphService {
    private readonly worldProvider: SceneService;
    private readonly materialStore: MaterialStore;

    private graph: Graph<GraphVertex, GraphEdge>;
    private visualizer: GraphEdgeVisualizer;

    constructor(worldProvider: SceneService, materialStore: MaterialStore) {
        this.worldProvider = worldProvider;
        this.materialStore = materialStore;
    }

    setGraph(graph: Graph<GraphVertex, GraphEdge>) {
        if (this.graph) {
            throw new Error('Graph already set for GraphService');
        }

        this.graph = graph;
        this.visualizer = new GraphEdgeVisualizer(this.worldProvider);
        this.visualizer.visualizeEdges(graph.edges, this.materialStore.getPathMaterial());
    }

    getVisualizer(): GraphEdgeVisualizer {
        return this.visualizer;
    }

    getGraph(): Graph<GraphVertex, GraphEdge> {
        return this.graph;
    }
}