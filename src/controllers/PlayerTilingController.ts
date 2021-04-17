import { InjectProperty } from "../di/diDecorators";
import { TileObj } from "../model/general/objs/TileObj";
import { PointerData } from "../services/input/PointerService";
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

    private playerTile: TileObj;
    private tileMarker: TileMarker;

    constructor() {
        super();
        this.tileStore = lookup.tileStore;
        this.meshStore = lookup.meshStore;
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

    private removeTiles() {
        this.tileStore.getAll().forEach(tile => tile.unMarkActive());
    }
}