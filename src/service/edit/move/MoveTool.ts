import { CharacterObj } from "../../../model/object/character/CharacterObj";
import { RenderGuiService } from "../ui/RenderGuiService";
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
        this.meshStore.getPlayers().forEach(player => {
            const route = this.routeStore.getRouteForCharacter(player);
            if (route) {
                route.walker.setStarted();
            }
        });
        // const player = this.meshStore.getActivePlayer();
        
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

        const players = this.meshStore.getPlayers();
        players.forEach(player => player.inputManager.keyboard(e, true));
    }

    keyUp(e: KeyboardEvent) {
        if (e.key === 'w') {
            this.isWalking = false;
        }

        const players = this.meshStore.getPlayers();
        players.forEach(player => player.inputManager.keyboard(e, false));
    }

    private movePlayers() {

        const deltaTime = this.worldProvider.world.engine.getDeltaTime();
        
        let players = this.meshStore.getPlayers();
        players.forEach(player => player.walker.walk(deltaTime));
        players.forEach(player => player.animationState.update());

        const activePlayer = this.meshStore.getActivePlayer();
        if (!activePlayer) { return; }

        // players = players.filter(player => player !== activePlayer);


        // if (this.isWalking) {
        //     this.walkCharacter(activePlayer, deltaTime);
        // }

        players.forEach(player => this.walkCharacter(player, deltaTime));
    }

    private walkCharacter(character: CharacterObj, deltaTime: number) {
        const route = this.routeStore.getRouteForCharacter(character);

        if (route) {
            route.walker.walk(deltaTime);        
        }     
    }
}