import { Mesh, MeshBuilder, Vector3 } from "babylonjs";
import { RouteItem } from "../../model/item/route/RouteItem";
import { RouteWalker } from "../../model/item/route/RouteWalker";
import { MaterialStore } from "../../store/MaterialStore";
import { WorldProvider } from "../WorldProvider";
import { Graph } from "./Graph";
import { GraphEdge, GraphVertex } from "./GraphImpl";

export class GraphVisualizer {
    private readonly graph: Graph<GraphVertex, GraphEdge>;
    private readonly worldProvider: WorldProvider;
    private readonly materialStore: MaterialStore;

    constructor(graph: Graph<GraphVertex, GraphEdge>, worldProvider: WorldProvider, materialStore: MaterialStore) {
        this.graph = graph;
        this.worldProvider = worldProvider;
        this.materialStore = materialStore;
    }

    visualizeRoute(route: RouteItem, routeWalker: RouteWalker): Mesh[] {
        const meshes: Mesh[] = [];
        meshes.push(this.visualizeRouteArrow(route, routeWalker));
        meshes.push(...this.visualizeRoutePath(route));
        return meshes;
    }

    visualizeEdge(...graphEdge: GraphEdge[]) {
        graphEdge.forEach(edge => this.createArrow(edge));
    }

    private visualizeRoutePath(route: RouteItem): Mesh[] {
        const meshes: Mesh[] = route.getEdges().map(edge => this.createArrow(edge));
        return meshes;
    }

    private visualizeRouteArrow(route: RouteItem, routeWalker: RouteWalker): Mesh {
        const pathes = this.createArrowHeadPathes(route, routeWalker);

        const mesh = MeshBuilder.CreateRibbon("arrow-head", {pathArray: pathes}, this.worldProvider.scene);

        mesh.material = this.materialStore.getActivePathMaterial();
        return mesh;
    }

    private createArrow(edge: GraphEdge): Mesh {
        const [v1, v2] = [edge.v1, edge.v2]
        const path1 = [edge.dimensions.p1, edge.dimensions.p2];
        const path2 = [edge.dimensions.p4, edge.dimensions.p3];
        const mesh = MeshBuilder.CreateRibbon(`path-${v1.id}-${v2.id}`, {pathArray: [path1, path2], updatable: false}, this.worldProvider.scene);
        mesh.material = this.materialStore.getRibbonMaterial();

        return mesh;
    }


    private createArrowHeadPathes(route: RouteItem, routeWalker: RouteWalker) {
        const lastEdge = route.getEdges()[route.getEdges().length - 1];
        const source = lastEdge.getSource(routeWalker.isReversed()).p.clone();
        const target = lastEdge.getTraget(routeWalker.isReversed()).p.clone();
        const angle = this.getAngle(source, target);
        const angelPlus = angle + Math.PI / 2;
        const angelMinus = angle - Math.PI / 2;
        const radius = 0.4;
        const end = target;

        const path1 = [
            end.add(new Vector3(radius * Math.cos(angelPlus), 0.8, radius * Math.sin(angelPlus))),
            end.add(new Vector3(radius * Math.cos(angelMinus), 0.8, radius * Math.sin(angelMinus))),
        ];

        const path2 = [
            end.add(new Vector3(radius * Math.cos(angle), 0.8, radius * Math.sin(angle))),
            end.add(new Vector3(radius * Math.cos(angle), 0.8, radius * Math.sin(angle))),
        ];

        return [path1, path2];
    }

    private getAngle(startPoint: Vector3, endPoint) {
        const vector = endPoint.subtract(startPoint);
        return Math.atan2(vector.z, vector.x);
    }
}