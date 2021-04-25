import { CharacterObj } from "../model/general/objs/CharacterObj";
import { RenderGuiService } from "../services/RenderGuiService";
import { WorldProvider } from "../services/WorldProvider";
import { MeshStore } from "../stores/MeshStore";
import { RouteStore } from "../stores/RouteStore";
import { Tool, ToolType } from "./Tool";

export class MoveTool extends Tool {
    private worldProvider: WorldProvider;
    private meshStore: MeshStore;
    private routeStore: RouteStore;
    private renderService: RenderGuiService;
    private _isCanceled: boolean = true;
    private isWalking: boolean = false;

    constructor(worldProvider: WorldProvider, meshStore: MeshStore, routeStore: RouteStore, renderService: RenderGuiService) {
        super(ToolType.MOVE);
        this.worldProvider = worldProvider;
        this.meshStore = meshStore;
        this.routeStore = routeStore;
        this.renderService = renderService;
    }

    beforeRender() {
        if (this.isCanceled()) { return; }

        if (this.isWalking) {
            console.log('walking')
            this.moveWalker();
        }
    }

    select(isCanceled: boolean) {
        this._isCanceled = isCanceled;
        const player = this.meshStore.getActivePlayer();
        
        const route = this.routeStore.getRouteForCharacter(player);
        if (route) {
            route.walker.setStarted();
        }
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
            this.isWalking = true;
        }
    }

    keyUp(e: KeyboardEvent) {
        if (e.key === 'w') {
            this.isWalking = false;
        }
    }

    private moveWalker() {
        const activePlayer = <CharacterObj> this.meshStore.getById('player2');

        if (!activePlayer) { return; }

        const deltaTime = this.worldProvider.world.engine.getDeltaTime();

        const route = this.routeStore.getRouteForCharacter(activePlayer);
        if (route) {
            route.walker.step(deltaTime);
        }
        
        activePlayer.walker.walk(deltaTime)
        activePlayer.animationState.update();
    }
}