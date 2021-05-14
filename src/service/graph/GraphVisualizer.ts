import { Mesh, MeshBuilder, Vector3 } from "babylonjs";
import { MaterialStore } from "../../store/MaterialStore";
import { WorldProvider } from "../WorldProvider";
import { Graph } from "./Graph";
import { GraphEdge, GraphVertex } from "./GraphImpl";

export class GraphVisualizer {
    private readonly graph: Graph<GraphVertex, GraphEdge>;
    private readonly worldProvider: WorldProvider;
    private readonly materialStore: MaterialStore;
    private meshes: Mesh[] = [];

    constructor(graph: Graph<GraphVertex, GraphEdge>, worldProvider: WorldProvider, materialStore: MaterialStore) {
        this.graph = graph;
        this.worldProvider = worldProvider;
        this.materialStore = materialStore;
    }

    show() {
        const meshes = this.graph.edges.map(edge => this.createArrow(edge));
        this.meshes = meshes;
    }

    private createArrow(edge: GraphEdge): Mesh {
        const [v1, v2] = [edge.v1, edge.v2]
        const pathes = this.createArrowPathes(v1.p, v2.p);
        const mesh = MeshBuilder.CreateRibbon(`path-${v1.id}-${v2.id}`, {pathArray: pathes, updatable: false}, this.worldProvider.scene);
        mesh.material = this.materialStore.getRibbonMaterial();

        return mesh;
    }

    private createArrowPathes(p1: Vector3, p2: Vector3) {
        const angle = this.getAngle(p1, p2);
        const angelPlus = angle + Math.PI / 2;
        const angelMinus = angle - Math.PI / 2;
        const radius = 0.2;
        
        const [start, end] = [p1, p2];

        const path1 = [
            start.add(new Vector3(radius * Math.cos(angelPlus), 0.5, radius * Math.sin(angelPlus))),
            end.add(new Vector3(radius * Math.cos(angelPlus), 0.5, radius * Math.sin(angelPlus))),
        ];

        const path2 = [
            start.add(new Vector3(radius * Math.cos(angelMinus), 0.5, radius * Math.sin(angelMinus))),
            end.add(new Vector3(radius * Math.cos(angelMinus), 0.5, radius * Math.sin(angelMinus))),
        ];

        return [path1, path2];
    }

    
    private getAngle(startPoint: Vector3, endPoint) {
        const vector = endPoint.subtract(startPoint);
        return Math.atan2(vector.z, vector.x);
    }
}