import { InjectProperty } from "../di/diDecorators";
import { TileObj } from "../model/general/objs/TileObj";
import { lookup } from "../services/Lookup";
import { MeshStore } from "../stores/MeshStore";
import { TileDepthFirstSearch, TileStore } from "../stores/TileStore";
import { AbstractController, ControllerType } from "./IController";


export class PlayerTilingController extends AbstractController {
    type = ControllerType.Player;

    @InjectProperty("TileStore")
    private tileStore: TileStore;

    @InjectProperty("MeshStore")
    private meshStore: MeshStore;

    private playerTile: TileObj;

    constructor() {
        super();
        this.tileStore = lookup.tileStore;
        this.meshStore = lookup.meshStore;
    }

    beforeRender() {
        const activePlayer = this.meshStore.getById('player2');

        if (!activePlayer) { return; }

        const currPlayerTile = this.tileStore.getTileByWorldPos(activePlayer.getPosition2D());
    
        if (this.playerTile !== currPlayerTile) {
            this.removeTiles();
            this.playerTile = currPlayerTile;
            this.markTiles();
        }
    }

    private removeTiles() {
        this.tileStore.getAll().forEach(tile => tile.unMarkActive());
    }

    private markTiles() {
        const search = new TileDepthFirstSearch();
        search.iterate(this.playerTile, this.tileStore, 3, (tile: TileObj) => {
            tile.markActive();
        });
    }
}