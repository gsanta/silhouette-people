import { MaterialStore } from "../../store/MaterialStore";
import { WorldProvider } from "../WorldProvider";
import { Graph } from "./Graph";
import { GraphEdge } from "./GraphEdge";
import { GraphVertex } from "./GraphImpl";
import { GraphVisualizer } from "./GraphVisualizer";

export class GraphService {
    private readonly worldProvider: WorldProvider;
    private readonly materialStore: MaterialStore;

    private graph: Graph<GraphVertex, GraphEdge>;
    private visualizer: GraphVisualizer;

    constructor(worldProvider: WorldProvider, materialStore: MaterialStore) {
        this.worldProvider = worldProvider;
        this.materialStore = materialStore;
    }

    setGraph(graph: Graph<GraphVertex, GraphEdge>) {
        if (this.graph) {
            throw new Error('Graph already set for GraphService');
        }

        this.graph = graph;
        this.visualizer = new GraphVisualizer(this.worldProvider);
        this.visualizer.visualizeEdges(graph.edges, this.materialStore.getPathMaterial());
    }

    getVisualizer(): GraphVisualizer {
        return this.visualizer;
    }

    getGraph(): Graph<GraphVertex, GraphEdge> {
        return this.graph;
    }
}