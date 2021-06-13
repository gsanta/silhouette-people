import { Mesh, MeshBuilder, Vector3 } from "babylonjs";
import { RouteItem } from "../../model/objects/route/RouteItem";
import { RouteController } from "../../model/objects/game_object/controller_route/RouteController";
import { MaterialStore } from "../../store/MaterialStore";
import { WorldProvider } from "../WorldProvider";
import { GraphEdge } from "./GraphEdge";

export class GraphVisualizer {
    private readonly worldProvider: WorldProvider;
    private readonly materialStore: MaterialStore;

    constructor(worldProvider: WorldProvider, materialStore: MaterialStore) {
        this.worldProvider = worldProvider;
        this.materialStore = materialStore;
    }

    visualizeRoute(route: RouteItem, routeWalker: RouteController): Mesh[] {
        const meshes: Mesh[] = [];
        meshes.push(this.createArrow(route, routeWalker));
        meshes.push(...route.getEdges().map(edge => this.createPathEdge(edge)));
        return meshes;
    }

    visualizeEdge(...graphEdge: GraphEdge[]) {
        graphEdge.forEach(edge => this.createPathEdge(edge));
    }

    private createPathEdge(edge: GraphEdge): Mesh {
        const [v1, v2] = [edge.v1, edge.v2]
        const path1 = [edge.dimensions.p1, edge.dimensions.p2];
        const path2 = [edge.dimensions.p4, edge.dimensions.p3];
        const mesh = MeshBuilder.CreateRibbon(`path-${v1.id}-${v2.id}`, {pathArray: [path1, path2], updatable: false}, this.worldProvider.scene);
        mesh.material = this.materialStore.getRibbonMaterial();

        return mesh;
    }

    private createArrow(route: RouteItem, routeWalker: RouteController): Mesh {
        const pathes = this.getArrowPathes(route, routeWalker);

        const mesh = MeshBuilder.CreateRibbon("arrow-head", {pathArray: pathes}, this.worldProvider.scene);

        mesh.material = this.materialStore.getActivePathMaterial();
        return mesh;
    }

    private getArrowPathes(route: RouteItem, routeWalker: RouteController) {
        const lastEdge = route.getEdges()[route.getEdges().length - 1];
        const isReversed = route.isReversed(lastEdge);
        const source = lastEdge.getSource(isReversed).p.clone();
        const target = lastEdge.getTraget(isReversed).p.clone();
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