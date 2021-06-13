import { PathItem } from "../../../model/item/PathItem";
import { RouteItem } from "../../../model/objects/route/RouteItem";
import { MaterialStore } from "../../../store/MaterialStore";
import { RouteStore } from "../../../store/RouteStore";
import { PointerData } from "../../base/pointer/PointerService";
import { RouteFactoryConfig, RouteFactory } from "../../routing/route/RouteFactory";
import { WorldProvider } from "../../WorldProvider";
import { PlayerStore } from "../../player/PlayerStore";
import { RenderGuiService } from "../../ui/RenderGuiService";
import { Tool, ToolType } from "../Tool";
import { PathBuilder } from "./PathBuilder";
import { RouteVisualizer } from "../../../model/item/route/adapters/visualization/RouteVisualizer";
import { GameObject } from "../../../model/objects/game_object/GameObject";

export class RouteTool extends Tool {
    private playerStore: PlayerStore;
    private renderService: RenderGuiService;
    private pathVisualizer: RouteVisualizer;
    private pathBuilder: PathBuilder;
    private routeFactory: RouteFactory;
    private routeStore: RouteStore;
    
    private character: GameObject;
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
        this.pathVisualizer = new RouteVisualizer(worldProvider, materialStore);
        this.pathBuilder = new PathBuilder();
    }

    pointerMove(pointer: PointerData) {
        if (this.isReset()) { return; }

        if (this.currentPath) {
            this.currentPath = this.pathBuilder.updatePath(this.currentPath, pointer.curr);

            this.pathVisualizer.visualize(this.route);
        } else {
            this.initRoute();
        }
    }

    pointerDown(pointer: PointerData) {
        if (this.isReset()) { return; }

        this.currentPath = this.pathBuilder.closePath(this.currentPath, pointer.curr);
        this.currentPath = this.pathBuilder.startPath(pointer.curr);
        // this.route.addPoint(pointer.curr);
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
            // this.route.removeLastPoint();
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
        let config: RouteFactoryConfig = { lockDirection: true };
        const pos = this.character.position;
        this.currentPath = this.pathBuilder.startPath(pos);
        this.route = this.routeFactory.createRoute(new PathItem([pos]), config, this.character);
    }
}
