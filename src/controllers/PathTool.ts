import { Mesh } from "babylonjs";
import { Path } from "../model/general/objs/Path";
import { RouteObj } from "../model/general/objs/RouteObj";
import { MeshState } from "../model/general/state/MeshState";
import { PointerData } from "../services/input/PointerService";
import { lookup } from "../services/Lookup";
import { WorldProvider } from "../services/WorldProvider";
import { MaterialStore } from "../stores/MaterialStore";
import { MeshStore } from "../stores/MeshStore";
import { PathBuilder } from "./PathBuilder";
import { PathVisualizer } from "./PathVisualizer";
import { Tool } from "./Tool";

export class PathTool implements Tool {
    private meshStore: MeshStore;
    private pathVisualizer: PathVisualizer;
    private pathBuilder: PathBuilder;
    
    private currentPath: Path;
    private route: RouteObj;
    private ribbon: Mesh;


    constructor(worldProvider: WorldProvider, materialStore: MaterialStore, meshStore: MeshStore) {
        this.meshStore = lookup.meshStore;
        this.pathVisualizer = new PathVisualizer(worldProvider, materialStore);
        this.pathBuilder = new PathBuilder();
    }

    pointerMove(pointer: PointerData) {
        if (this.currentPath) {
            this.currentPath = this.pathBuilder.updatePath(this.currentPath, pointer.curr2D);

            this.pathVisualizer.visualize(this.currentPath);
        }
    }

    pointerDown(pointer: PointerData) {
        this.currentPath = this.pathBuilder.closePath(this.currentPath, pointer.curr2D);;
        this.currentPath = this.pathBuilder.startPath(pointer.curr2D);
        this.ribbon = undefined;
        this.route.addPath(this.currentPath);
    }

    select() {
        this.initRoute();
    }

    cancel() {
        if (this.route) {
            this.route.dispose();
        }

        this.initRoute();
    }

    private initRoute() {
        const player = this.meshStore.getActivePlayer();
        this.currentPath = this.pathBuilder.startPath(player.getPosition2D());
        this.ribbon = undefined;
        this.route = new RouteObj(player, [this.currentPath]);
    }
}
