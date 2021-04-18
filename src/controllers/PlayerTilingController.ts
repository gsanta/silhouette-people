import { Vector2 } from "babylonjs/Maths/math.vector";
import { InjectProperty } from "../di/diDecorators";
import { Route } from "../model/general/objs/Route";
import { TileObj } from "../model/general/objs/TileObj";
import { RouteFactory } from "../services/factory/RouteFactory";
import { MouseButtonType, PointerData } from "../services/input/PointerService";
import { lookup } from "../services/Lookup";
import { TileMarker } from "../services/tile/TileMarker";
import { MeshStore } from "../stores/MeshStore";
import { TileStore } from "../stores/TileStore";
import { AbstractController, ControllerType } from "./IController";

export class PlayerTilingController extends AbstractController {
    type = ControllerType.Player;

    @InjectProperty("TileStore")
    private tileStore: TileStore;

    @InjectProperty("MeshStore")
    private meshStore: MeshStore;

    @InjectProperty("RouteFactory")
    private routeFactory: RouteFactory;


    private playerTile: TileObj;
    private tileMarker: TileMarker;
    // routeTiles: TileObj[] = [];
    route: Route;

    constructor() {
        super();
        this.tileStore = lookup.tileStore;
        this.meshStore = lookup.meshStore;
        this.routeFactory = lookup.routeFactory;
        this.tileMarker = new TileMarker();
    }

    beforeRender() {
        const activePlayer = this.meshStore.getById('player2');

        if (!activePlayer) { return; }

        const currPlayerTile = this.tileStore.getTileByWorldPos(activePlayer.getPosition2D());
    
        if (this.playerTile !== currPlayerTile) {
            this.removeTiles();
            this.playerTile = currPlayerTile;
        }
    }

    pointerMove(pointer: PointerData) {
        this.tileMarker.unmarkHoverAll();
        this.tileMarker.markHover(pointer.curr2D);
    }

    pointerDown(pointer: PointerData) {
        let tile = this.tileStore.getTileByWorldPos(pointer.down2D);
        switch(pointer.buttonType) {
            case MouseButtonType.LEFT:
                tile.markActive();
                if (!this.route) {
                    this.route = this.createRoute(tile.getPosition2D());
                } else {
                    this.route.checkPoints.push(tile.getPosition2D())
                }
            break;
            case MouseButtonType.RIGHT:
                tile.unMarkActive();
                // this.routeTiles = this.routeTiles.filter(t => t !== tile);
            break;
        }
    }

    private createRoute(initialCheckPoint: Vector2) {
        const activePlayer = this.meshStore.getActivePlayer();
        const route = this.routeFactory.createRoute(activePlayer, [initialCheckPoint]);
        return route;
    }

    private removeTiles() {
        this.tileStore.getAll().forEach(tile => tile.unMarkActive());
    }
}