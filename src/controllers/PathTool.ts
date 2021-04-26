import { CharacterObj } from "../model/general/objs/CharacterObj";
import { Path } from "../model/general/objs/Path";
import { RouteObj } from "../model/general/objs/RouteObj";
import { PointerData } from "../services/input/PointerService";
import { RenderGuiService } from "../services/RenderGuiService";
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
    private renderService: RenderGuiService;
    private pathVisualizer: PathVisualizer;
    private pathBuilder: PathBuilder;
    
    private currentCharacter: CharacterObj;
    private characters: CharacterObj[];
    private currentPath: Path;
    private route: RouteObj;
    private _isCanceled = true;;

    constructor(worldProvider: WorldProvider, toolService: ToolService, materialStore: MaterialStore, meshStore: MeshStore, routeStore: RouteStore, renderService: RenderGuiService) {
        super(ToolType.PATH);
        this.meshStore = meshStore;
        this.routeStore = routeStore;
        this.toolService = toolService;
        this.renderService = renderService;
        this.pathVisualizer = new PathVisualizer(worldProvider, materialStore);
        this.pathBuilder = new PathBuilder();
    }

    pointerMove(pointer: PointerData) {
        if (this.isCanceled()) { return; }

        if (this.currentPath) {
            this.currentPath = this.pathBuilder.updatePath(this.currentPath, pointer.curr2D);

            this.pathVisualizer.visualize(this.currentPath);
        } else {
            this.initRoute();
        }
    }

    pointerDown(pointer: PointerData) {
        if (this.isCanceled()) { return; }

        this.currentPath = this.pathBuilder.closePath(this.currentPath, pointer.curr2D);;
        this.currentPath = this.pathBuilder.startPath(pointer.curr2D);
        this.route.addPath(this.currentPath);
    }

    isCanceled() {
        return this._isCanceled;
    }

    select(isCanceled: boolean) {
        this._isCanceled = isCanceled;
        this.characters = this.meshStore.getPlayers();

        this.renderService.render();
    }

    cancel() {
        if (this.route) {
            this.route.dispose();
        }

        this._isCanceled = true;
        this.renderService.render();
    }

    reset() {
        this._isCanceled = false;
        this.renderService.render();
    }

    keyDown(e: KeyboardEvent) {
        if (e.key === 'Enter') {
            if (this.route) {
                this.finishRoute();

                if (this.currentCharacter === this.characters[this.characters.length - 1]) {
                    this.toolService.setSelectedTool(this.toolService.move, true);
                }
            }
        }
    }

    private finishRoute() {
        if (this.currentPath) {
            this.route.removePath(this.currentPath);
            this.currentPath.dispose();
        }
        this.currentPath = undefined;
        if (this.route.pathes.length > 0) {
            this.routeStore.addRoute(this.route);
        }
    }

    private initRoute() {
        const characterIndex = this.characters.indexOf(this.currentCharacter) + 1;
        this.currentCharacter = this.characters[characterIndex];
        this.currentPath = this.pathBuilder.startPath(this.currentCharacter.getPosition2D());
        this.route = new RouteObj(this.currentCharacter, [this.currentPath]);
    }
}
