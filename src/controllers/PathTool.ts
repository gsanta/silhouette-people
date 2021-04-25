import { Path } from "../model/general/objs/Path";
import { RouteObj } from "../model/general/objs/RouteObj";
import { PointerData } from "../services/input/PointerService";
import { ToolService } from "../services/ToolService";
import { WorldProvider } from "../services/WorldProvider";
import { MaterialStore } from "../stores/MaterialStore";
import { MeshStore } from "../stores/MeshStore";
import { RouteStore } from "../stores/RouteStore";
import { PathBuilder } from "./PathBuilder";
import { PathVisualizer } from "./PathVisualizer";
import { Tool, ToolType } from "./Tool";

export class PathTool extends Tool {
    private meshStore: MeshStore;
    private routeStore: RouteStore;
    private toolService: ToolService;
    private pathVisualizer: PathVisualizer;
    private pathBuilder: PathBuilder;
    
    private currentPath: Path;
    private route: RouteObj;

    constructor(worldProvider: WorldProvider, toolService: ToolService, materialStore: MaterialStore, meshStore: MeshStore, routeStore: RouteStore) {
        super(ToolType.PATH);
        this.meshStore = meshStore;
        this.routeStore = routeStore;
        this.toolService = toolService;
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

    keyDown(e: KeyboardEvent) {
        if (e.key === 'Enter') {
            if (this.route) {
                this.route.removePath(this.currentPath);
                if (this.route.pathes.length > 0) {
                    this.routeStore.addRoute(this.route);
                    this.toolService.setSelectedTool(undefined);
                }
            }
        }
    }

    private initRoute() {
        const player = this.meshStore.getActivePlayer();
        this.currentPath = this.pathBuilder.startPath(player.getPosition2D());
        this.route = new RouteObj(player, [this.currentPath]);
    }
}
