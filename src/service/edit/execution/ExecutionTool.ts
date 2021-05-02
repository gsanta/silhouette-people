import { RenderGuiService } from "../../ui/RenderGuiService";
import { WorldProvider } from "../../object/world/WorldProvider";
import { MeshStore } from "../../../store/MeshStore";
import { RouteStore } from "../../../store/RouteStore";
import { Tool, ToolType } from "../Tool";
import { CharacterObj } from "../../../model/object/character/CharacterObj";

export class MoveTool extends Tool {
    private worldProvider: WorldProvider;
    private meshStore: MeshStore;
    private routeStore: RouteStore;
    private renderService: RenderGuiService;
    private _isCanceled: boolean = true;

    private isStarted: boolean = false;
    private readyListeners: ((wasCanceled: boolean) => void)[] = [];
    private activePlayer: CharacterObj;

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

            this.updateRoutes(deltaTime, [this.activePlayer]);
            this.updateWalkers(deltaTime, [this.activePlayer]);

            if (this.routeStore.getRouteForCharacter(this.activePlayer).walker.isFinished()) {
                this.readyListeners.forEach(listener => listener(false));
            }
        }
    }

    select(isCanceled: boolean) {
        this.activePlayer = this.meshStore.getActivePlayer();
        this._isCanceled = isCanceled;
        this.startRoutes([this.activePlayer]);
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

    onFinished(callback: (wasCanceled: boolean) => void) {
        this.readyListeners.push(callback);
    }

    removeOnFinished(callback: (wasCanceled: boolean) => void) {
        this.readyListeners = this.readyListeners.filter(cb => cb !== callback);
    }

    private updateInput(e: KeyboardEvent, isDown: boolean) {
        const activePlayer = this.meshStore.getActivePlayer();
        activePlayer.inputManager.keyboard(e, isDown);
    }

    private startRoutes(characters: CharacterObj[]) {
        characters.forEach(player => {
            const route = this.routeStore.getRouteForCharacter(player);
            if (route) {
                route.walker.setStarted();
            }
        });
    }

    private updateRoutes(deltaTime: number, characters: CharacterObj[]) {
        characters.forEach(player => {
            const route = this.routeStore.getRouteForCharacter(player);

            if (route) {
                route.walker.walk(deltaTime);        
            } 
        });
    }

    private updateWalkers(deltaTime: number, characters: CharacterObj[]) {
        characters.forEach(player => player.walker.walk(deltaTime));
        characters.forEach(player => player.animationState.update());
    }
}