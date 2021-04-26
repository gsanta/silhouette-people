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
            this.movePlayers();
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
            this.isStarted = true;
        }
    }

    keyUp(e: KeyboardEvent) {
        if (e.key === 'w') {
            this.isWalking = false;
        }
    }

    private movePlayers() {
        const activePlayer = this.meshStore.getActivePlayer();
        if (!activePlayer) { return; }

        let players = this.meshStore.getPlayers();
        players = players.filter(player => player !== activePlayer);

        const deltaTime = this.worldProvider.world.engine.getDeltaTime();

        if (this.isWalking) {
            this.walkCharacter(activePlayer, deltaTime);
        }

        players.forEach(player => this.walkCharacter(player, deltaTime));
    }

    private walkCharacter(character: CharacterObj, deltaTime: number) {
        const route = this.routeStore.getRouteForCharacter(character);

        if (route) {
            route.walker.walk(deltaTime);        
        }     
    }
}