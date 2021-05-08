import { CharacterItem } from "../../../model/item/character/CharacterItem";
import { PathItem } from "../../../model/item/PathItem";
import { RouteItem } from "../../../model/item/route/RouteItem";
import { MaterialStore } from "../../../store/MaterialStore";
import { MeshStore } from "../../../store/MeshStore";
import { RouteStore } from "../../../store/RouteStore";
import { PointerData } from "../../base/pointer/PointerService";
import { RouteConfig, RouteFactory } from "../../object/route/RouteFactory";
import { WorldProvider } from "../../object/world/WorldProvider";
import { PlayerStore } from "../../player/PlayerStore";
import { RenderGuiService } from "../../ui/RenderGuiService";
import { Tool, ToolType } from "../Tool";
import { PathBuilder } from "./PathBuilder";
import { PathVisualizer } from "./PathVisualizer";

export class RouteTool extends Tool {
    private playerStore: PlayerStore;
    private renderService: RenderGuiService;
    private pathVisualizer: PathVisualizer;
    private pathBuilder: PathBuilder;
    private routeFactory: RouteFactory;
    private routeStore: RouteStore;
    
    private character: CharacterItem;
    private currentPath: PathItem;
    private route: RouteItem;
    private _isReset = true;
    private onFinishedListeners: ((wasCanceled: boolean) => void)[] = [];

    constructor(worldProvider: WorldProvider, materialStore: MaterialStore, playerStore: PlayerStore, renderService: RenderGuiService, routeFactory: RouteFactory, routeStore: RouteStore) {
        super(ToolType.PATH);
        this.playerStore = playerStore;
        this.renderService = renderService;
        this.routeFactory = routeFactory;
        this.routeStore = routeStore;
        this.pathVisualizer = new PathVisualizer(worldProvider, materialStore);
        this.pathBuilder = new PathBuilder();
    }

    pointerMove(pointer: PointerData) {
        if (this.isReset()) { return; }

        if (this.currentPath) {
            this.currentPath = this.pathBuilder.updatePath(this.currentPath, pointer.curr2D);

            this.pathVisualizer.visualize(this.currentPath);
        } else {
            this.initRoute();
        }
    }

    pointerDown(pointer: PointerData) {
        if (this.isReset()) { return; }

        this.currentPath = this.pathBuilder.closePath(this.currentPath, pointer.curr2D);;
        this.currentPath = this.pathBuilder.startPath(pointer.curr2D);
        this.route.addPath(this.currentPath);
    }

    isReset() {
        return this._isReset;
    }

    select(isCanceled: boolean) {
        this._isReset = isCanceled;
        this.character = this.playerStore.getActivePlayer();

        this.renderService.render();
    }

    cancel() {
        if (this.route) {
            this.route.dispose();
        }

        this._isReset = true;

        this.onFinishedListeners.forEach(listener => listener(true));
        this.renderService.render();
    }

    reset() {
        this._isReset = false;
        this.resetRoute();
        this.renderService.render();
    }

    keyDown(e: KeyboardEvent) {
        if (this._isReset) { return; }

        if (e.key === 'Enter') {
            this._isReset = true;
            if (this.route) {
                this.finishRoute();
            }

            this.onFinishedListeners.forEach(listener => listener(false));
        } else if (e.key === 'Escape') {
            this.resetRoute();
        }
    }

    onFinished(callback: (wasCanceled: boolean) => void) {
        this.onFinishedListeners.push(callback);
    }

    removeOnFinished(callback: (wasCanceled: boolean) => void) {
        this.onFinishedListeners = this.onFinishedListeners.filter(cb => cb !== callback);
    }

    private finishRoute() {
        if (this.currentPath) {
            this.route.removePath(this.currentPath);
            this.currentPath.dispose();
        }
        this.currentPath = undefined;
    }

    private resetRoute() {
        if (this.route) {
            this.routeStore.deleteRoute(this.route);
        }
        this.route = undefined;
        this.currentPath = undefined;
    }

    private initRoute() {
        let config: RouteConfig = { lockDirection: true };
        this.currentPath = this.pathBuilder.startPath(this.character.instance.getPosition2D());
        this.route = this.routeFactory.createRoute([this.currentPath], config, this.character);
    }
}
