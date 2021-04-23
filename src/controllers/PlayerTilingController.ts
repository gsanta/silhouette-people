import { InjectProperty } from "../di/diDecorators";
import { RouteBasedCharacterWalker } from "../model/character/states/RouteBasedCharacterWalker";
import { CharacterObj } from "../model/general/objs/CharacterObj";
import { RouteObj } from "../model/general/objs/RouteObj";
import { TileObj } from "../model/general/objs/TileObj";
import { RouteFactory } from "../services/factory/RouteFactory";
import { KeyboardService } from "../services/input/KeyboardService";
import { MouseButtonType, PointerData } from "../services/input/PointerService";
import { lookup } from "../services/Lookup";
import { TileMarker } from "../services/tile/TileMarker";
import { ToolService } from "../services/ToolService";
import { WorldProvider } from "../services/WorldProvider";
import { MaterialStore } from "../stores/MaterialStore";
import { MeshStore } from "../stores/MeshStore";
import { TileStore } from "../stores/TileStore";
import { AbstractController, ControllerType } from "./IController";
import { PathTool } from "./PathTool";

export class PlayerTilingController extends AbstractController {
    type = ControllerType.Player;

    @InjectProperty("MaterialStore")
    private materialStore: MaterialStore;

    @InjectProperty("TileStore")
    private tileStore: TileStore;

    @InjectProperty("MeshStore")
    private meshStore: MeshStore;

    @InjectProperty("RouteFactory")
    private routeFactory: RouteFactory;

    @InjectProperty("WorldProvider")
    private worldProvider: WorldProvider;

    @InjectProperty("ToolService")
    private toolService: ToolService;

    @InjectProperty("KeyboardService")
    private keyboardService: KeyboardService;

    private playerTile: TileObj;
    private tileMarker: TileMarker;
    private pathTool: PathTool;
    // routeTiles: TileObj[] = [];
    route: RouteObj;

    constructor() {
        super();
        this.tileStore = lookup.tileStore;
        this.meshStore = lookup.meshStore;
        this.routeFactory = lookup.routeFactory;
        this.worldProvider = lookup.worldProvider;
        this.materialStore = lookup.materialStore;
        this.toolService = lookup.toolService;
        this.keyboardService = lookup.keyboard;
        this.tileMarker = new TileMarker();
        this.pathTool = new PathTool(this.worldProvider, this.materialStore, this.meshStore);
    }

    keyboard(e: KeyboardEvent) {
        switch(e.key) {
            case 'Escape':
                if (this.toolService.getSelectedTool()) {
                    this.toolService.getSelectedTool().cancel();
                }
            break;
        }
    }

    beforeRender() {
        const activePlayer = <CharacterObj> this.meshStore.getById('player2');

        if (!activePlayer) { return; }

        const currPlayerTile = this.tileStore.getTileByWorldPos(activePlayer.getPosition2D());

        const deltaTime = this.worldProvider.world.engine.getDeltaTime();
        activePlayer.walker.walk(deltaTime)
        activePlayer.animationState.update();
    
        // if (this.playerTile !== currPlayerTile) {
        //     // this.removeTiles();
        //     this.playerTile = currPlayerTile;
        // }
    }

    pointerMove(pointer: PointerData) {
        if (this.toolService.getSelectedTool()) {
            this.toolService.getSelectedTool().pointerMove(pointer);
        }
        // this.tileMarker.unmarkHoverAll();
        // this.tileMarker.markHover(pointer.curr2D);
    }

    pointerDown(pointer: PointerData) {
        if (this.toolService.getSelectedTool()) {
            this.toolService.getSelectedTool().pointerDown(pointer);
        }
        // let tile = this.tileStore.getTileByWorldPos(pointer.down2D);
        // switch(pointer.buttonType) {
        //     case MouseButtonType.LEFT:
        //         tile.markActive();
        //         if (!this.route) {
        //             this.route = this.createRoute();
        //         }
        //         this.route.checkPoints.push(tile.getPosition2D())
        //     break;
        //     case MouseButtonType.RIGHT:
        //         tile.unMarkActive();
        //         // this.routeTiles = this.routeTiles.filter(t => t !== tile);
        //     break;
        // }
    }

    // private createRoute() {
    //     const activePlayer = this.meshStore.getActivePlayer();
    //     const initialCheckPoint = activePlayer.getPosition2D();
    //     const route = this.routeFactory.createRoute(activePlayer, [initialCheckPoint]);
    //     route.walker.setPaused(true);
    //     activePlayer.walker = new RouteBasedCharacterWalker(route);
    //     return route;
    // }

    // private removeTiles() {
    //     this.tileStore.getAll().forEach(tile => tile.unMarkActive());
    // }
}