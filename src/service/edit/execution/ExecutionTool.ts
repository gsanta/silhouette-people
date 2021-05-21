import { RenderGuiService } from "../../ui/RenderGuiService";
import { WorldProvider } from "../../WorldProvider";
import { RouteStore } from "../../../store/RouteStore";
import { Tool, ToolType } from "../Tool";
import { CharacterItem } from "../../../model/item/character/CharacterItem";
import { RouteExecutor } from "./RouteExecutor";
import { PlayerStore } from "../../player/PlayerStore";
import { RouteItem } from "../../../model/item/route/RouteItem";

export class ExecutionTool extends Tool {
    private worldProvider: WorldProvider;
    private playerStore: PlayerStore;
    private routeStore: RouteStore;
    private renderService: RenderGuiService;
    private _isCanceled: boolean = true;

    private isStarted: boolean = false;
    private readyListeners: ((wasCanceled: boolean) => void)[] = [];
    private activePlayer: CharacterItem;

    private routeExecutors: RouteExecutor[] = [];

    constructor(worldProvider: WorldProvider, playerStore: PlayerStore, routeStore: RouteStore, renderService: RenderGuiService) {
        super(ToolType.MOVE);
        this.worldProvider = worldProvider;
        this.playerStore = playerStore;
        this.routeStore = routeStore;
        this.renderService = renderService;
    }

    addRouteExecutor(routeExecutor: RouteExecutor) {
        this.routeExecutors.push(routeExecutor);
    }

    beforeRender() {
        if (this.isReset()) { return; }

        const deltaTime = this.worldProvider.world.engine.getDeltaTime();

        this.routeExecutors.forEach(executor => executor.updateRoutes(deltaTime));
        if (this.isStarted) {
            
            this.updateRoutes(deltaTime, [this.activePlayer]);
            this.updateWalkers(deltaTime, [this.activePlayer]);
        }
    }

    select(isCanceled: boolean) {
        this.activePlayer = this.playerStore.getActivePlayer();
        this._isCanceled = isCanceled;
        this.startRoutes([this.activePlayer]);
    }

    private onPlayerFinished(route: RouteItem) {
        this.isStarted = false;
        this.readyListeners.forEach(listener => listener(false));
        this.routeStore.deleteRoute(route);
        // if (route.character) {
        //     route.character.route = undefined;
        // }
    }

    isReset(): boolean {
        return this._isCanceled;
    }

    reset() {
        this._isCanceled = false;
        this.renderService.render();
    }

    keyDown(e: KeyboardEvent) {
        if (e.key === 'w') {
            this.isStarted = true;
        }

        this.updateInput(e, true);
    }

    keyUp(e: KeyboardEvent) {
        this.updateInput(e, false);
    }

    onFinished(callback: (wasCanceled: boolean) => void) {
        this.readyListeners.push(callback);
    }

    removeOnFinished(callback: (wasCanceled: boolean) => void) {
        this.readyListeners = this.readyListeners.filter(cb => cb !== callback);
    }

    private updateInput(e: KeyboardEvent, isDown: boolean) {
        const activePlayer = this.playerStore.getActivePlayer();
        activePlayer.inputManager.keyboard(e, isDown);
    }

    private startRoutes(characters: CharacterItem[]) {
        characters.forEach(player => {
            if (player.routeWalker) {
                player.routeWalker.setStarted(true);
            }
        });
    }

    private updateRoutes(deltaTime: number, characters: CharacterItem[]) {
        characters.forEach(player => {
            if (player.routeWalker) {
                player.routeWalker.walk(deltaTime);        
            } 
        });
    }

    private updateWalkers(deltaTime: number, characters: CharacterItem[]) {
        characters.forEach(player => player.walker.walk(deltaTime));
        characters.forEach(player => player.animationState.update());
    }
}