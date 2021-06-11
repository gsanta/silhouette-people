import { InjectProperty } from "../../di/diDecorators";
import { MaterialStore } from "../../store/MaterialStore";
import { lookup } from "../Lookup";
import { WorldProvider } from "../WorldProvider";
import { Graph } from "./Graph";
import { GraphEdge } from "./GraphEdge";
import { GraphVertex } from "./GraphImpl";
import { GraphVisualizer } from "./GraphVisualizer";

export class GraphService {
    @InjectProperty("WorldProvider")
    private worldProvider: WorldProvider;

    @InjectProperty("MaterialStore")
    private materialStore: MaterialStore;

    private graph: Graph<GraphVertex, GraphEdge>;
    private visualizer: GraphVisualizer;

    constructor() {
        this.worldProvider = lookup.worldProvider;
        this.materialStore = lookup.materialStore;
    }

    setGraph(graph: Graph<GraphVertex, GraphEdge>) {
        if (this.graph) {
            throw new Error('Graph already set for GraphService');
        }

        this.graph = graph;
        this.visualizer = new GraphVisualizer(this.worldProvider, this.materialStore);
        this.visualizer.visualizeEdge(...graph.edges);
    }

    getVisualizer(): GraphVisualizer {
        return this.visualizer;
    }

    getGraph(): Graph<GraphVertex, GraphEdge> {
        return this.graph;
    }
}