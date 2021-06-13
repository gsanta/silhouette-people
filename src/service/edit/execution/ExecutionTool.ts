import { RenderGuiService } from "../../ui/RenderGuiService";
import { WorldProvider } from "../../WorldProvider";
import { RouteStore } from "../../../store/RouteStore";
import { Tool, ToolType } from "../Tool";
import { RouteExecutor } from "./RouteExecutor";
import { PlayerStore } from "../../player/PlayerStore";
import { RouteItem } from "../../../model/item/route/RouteItem";
import { KeyboardService } from "../../base/keyboard/KeyboardService";
import { MeshItem } from "../../../model/item/mesh/MeshItem";

export class ExecutionTool extends Tool {
    private worldProvider: WorldProvider;
    private playerStore: PlayerStore;
    private routeStore: RouteStore;
    private renderService: RenderGuiService;
    private readonly keyboardService: KeyboardService;
    private _isCanceled: boolean = true;

    private isStarted: boolean = false;
    private readyListeners: ((wasCanceled: boolean) => void)[] = [];
    private activePlayer: MeshItem;

    private routeExecutors: RouteExecutor[] = [];

    constructor(worldProvider: WorldProvider, playerStore: PlayerStore, routeStore: RouteStore, renderService: RenderGuiService, keyboardService: KeyboardService) {
        super(ToolType.MOVE);
        this.worldProvider = worldProvider;
        this.playerStore = playerStore;
        this.routeStore = routeStore;
        this.renderService = renderService;
        this.keyboardService = keyboardService;
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
        this.routeExecutors.forEach(executor => executor.startRoutes());
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
        activePlayer.inputController.keyboard(this.keyboardService.keyNames);
    }

    private startRoutes(characters: MeshItem[]) {
        characters.forEach(player => {
            if (player.routeController) {
                player.routeController.setStarted(true);
            }
        });
    }

    private updateRoutes(deltaTime: number, characters: MeshItem[]) {
        characters.forEach(player => {
            if (player.routeController) {
                player.routeController.walk(deltaTime);        
            } 
        });
    }

    private updateWalkers(deltaTime: number, characters: MeshItem[]) {
        characters.forEach(player => player.characterController.walk(deltaTime));
        characters.forEach(player => player.stateController.state.update(deltaTime));
    }
}