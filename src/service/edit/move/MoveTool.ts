import { RenderGuiService } from "../../ui/RenderGuiService";
import { WorldProvider } from "../../object/world/WorldProvider";
import { MeshStore } from "../../../store/MeshStore";
import { RouteStore } from "../../../store/RouteStore";
import { Tool, ToolType } from "../Tool";

export class MoveTool extends Tool {
    private worldProvider: WorldProvider;
    private meshStore: MeshStore;
    private routeStore: RouteStore;
    private renderService: RenderGuiService;
    private _isCanceled: boolean = true;

    private isStarted: boolean = false;

    constructor(worldProvider: WorldProvider, meshStore: MeshStore, routeStore: RouteStore, renderService: RenderGuiService) {
        super(ToolType.MOVE);
        this.worldProvider = worldProvider;
        this.meshStore = meshStore;
        this.routeStore = routeStore;
        this.renderService = renderService;
    }

    beforeRender() {
        if (this.isCanceled()) { return; }

        if (this.isStarted) {
            const deltaTime = this.worldProvider.world.engine.getDeltaTime();

            this.updateRoutes(deltaTime);
            this.updateWalkers(deltaTime);
        }
    }

    select(isCanceled: boolean) {
        this._isCanceled = isCanceled;
        this.meshStore.getPlayers().forEach(player => {
            const route = this.routeStore.getRouteForCharacter(player);
            if (route) {
                route.walker.setStarted();
            }
        });
        
    }

    isCanceled(): boolean {
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

    private updateInput(e: KeyboardEvent, isDown: boolean) {
        const activePlayer = this.meshStore.getActivePlayer();
        activePlayer.inputManager.keyboard(e, isDown);
    }

    private updateRoutes(deltaTime: number) {
        let players = this.meshStore.getPlayers();

        players.forEach(player => {
            const route = this.routeStore.getRouteForCharacter(player);

            if (route) {
                route.walker.walk(deltaTime);        
            } 
        });
    }

    private updateWalkers(deltaTime: number) {
        let players = this.meshStore.getPlayers();
        players.forEach(player => player.walker.walk(deltaTime));
        players.forEach(player => player.animationState.update());
    }
}