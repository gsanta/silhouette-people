import { MaterialStore } from "../../store/MaterialStore";
import { SceneService } from "../SceneService";
import { Graph } from "./Graph";
import { GraphEdge } from "./GraphEdge";
import { GraphImpl, GraphVertex } from "./GraphImpl";
import { GraphEdgeVisualizer } from "./GraphEdgeVisualizer";

export class GraphService {
    private readonly worldProvider: SceneService;
    private readonly materialStore: MaterialStore;

    private graph: GraphImpl;
    private visualizer: GraphEdgeVisualizer;

    constructor(worldProvider: SceneService, materialStore: MaterialStore) {
        this.worldProvider = worldProvider;
        this.materialStore = materialStore;
    }

    setGraph(graph: GraphImpl) {
        if (this.graph) {
            throw new Error('Graph already set for GraphService');
        }

        this.graph = graph;
        this.visualizer = new GraphEdgeVisualizer(this.worldProvider, this.materialStore);
        this.visualizer.visualizeEdges(graph.edges, edge => edge.color);
    }

    getVisualizer(): GraphEdgeVisualizer {
        return this.visualizer;
    }

    getGraph(): GraphImpl {
        return this.graph;
    }
}