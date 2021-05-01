import { CharacterObj } from "../../../model/object/character/CharacterObj";
import { PathObj } from "../../../model/object/PathObj";
import { RouteObj } from "../../../model/object/route/RouteObj";
import { RouteConfig, RouteFactory } from "../../object/route/RouteFactory";
import { PointerData } from "../../base/pointer/PointerService";
import { RenderGuiService } from "../../ui/RenderGuiService";
import { ToolService } from "../ToolService";
import { WorldProvider } from "../../object/world/WorldProvider";
import { MaterialStore } from "../../../store/MaterialStore";
import { MeshStore } from "../../../store/MeshStore";
import { RouteStore } from "../../../store/RouteStore";
import { PathBuilder } from "./PathBuilder";
import { PathVisualizer } from "./PathVisualizer";
import { Tool, ToolType } from "../Tool";

export class PathTool extends Tool {
    private meshStore: MeshStore;
    private routeStore: RouteStore;
    private toolService: ToolService;
    private renderService: RenderGuiService;
    private pathVisualizer: PathVisualizer;
    private pathBuilder: PathBuilder;
    private routeFactory: RouteFactory;
    
    private character: CharacterObj;
    // private characters: CharacterObj[];
    private currentPath: PathObj;
    private route: RouteObj;
    private _isCanceled = true;
    private readyListeners: ((wasCanceled: boolean) => void)[] = [];

    constructor(worldProvider: WorldProvider, toolService: ToolService, materialStore: MaterialStore, meshStore: MeshStore, routeStore: RouteStore, renderService: RenderGuiService, routeFactory: RouteFactory) {
        super(ToolType.PATH);
        this.meshStore = meshStore;
        this.routeStore = routeStore;
        this.toolService = toolService;
        this.renderService = renderService;
        this.routeFactory = routeFactory;
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
        this.character = this.meshStore.getActivePlayer();
        // this.characters = this.meshStore.getPlayers();

        this.renderService.render();
    }

    cancel() {
        if (this.route) {
            this.route.dispose();
        }

        this._isCanceled = true;

        this.readyListeners.forEach(listener => listener(true));
        this.renderService.render();
    }

    reset() {
        this._isCanceled = false;
        this.renderService.render();
    }

    keyDown(e: KeyboardEvent) {
        if (this._isCanceled) { return; }

        if (e.key === 'Enter') {
            if (this.route) {
                this.finishRoute();

                // if (this.character === this.characters[this.characters.length - 1]) {
                //     this.toolService.setSelectedTool(this.toolService.move, true);
                // }
            }

            this.readyListeners.forEach(listener => listener(false));
        }
    }

    onFinished(callback: (wasCanceled: boolean) => void) {
        this.readyListeners.push(callback);
    }

    removeOnFinished(callback: (wasCanceled: boolean) => void) {
        this.readyListeners = this.readyListeners.filter(cb => cb !== callback);
    }

    private finishRoute() {
        if (this.currentPath) {
            this.route.removePath(this.currentPath);
            this.currentPath.dispose();
        }
        this.currentPath = undefined;
    }

    private initRoute() {
        // const characterIndex = this.characters.indexOf(this.character) + 1;
        // this.character = this.characters[characterIndex];
        // const activeCharacter = this.meshStore.getActivePlayer();

        this.currentPath = this.pathBuilder.startPath(this.character.instance.getPosition2D());
        this.route = this.routeFactory.createRoute(this.character, [this.currentPath]);
        
        // let config: RouteConfig = { lockDirection: true };

        // if (this.character !== activeCharacter) {
        //     config.lockSpeed = true;
        // }
        
    }
}
