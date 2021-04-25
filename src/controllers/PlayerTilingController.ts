import { InjectProperty } from "../di/diDecorators";
import { CharacterObj } from "../model/general/objs/CharacterObj";
import { RouteObj } from "../model/general/objs/RouteObj";
import { PointerData } from "../services/input/PointerService";
import { lookup } from "../services/Lookup";
import { ToolService } from "../services/ToolService";
import { WorldProvider } from "../services/WorldProvider";
import { MaterialStore } from "../stores/MaterialStore";
import { MeshStore } from "../stores/MeshStore";
import { RouteStore } from "../stores/RouteStore";
import { TileStore } from "../stores/TileStore";
import { AbstractController, ControllerType } from "./IController";

export class PlayerTilingController extends AbstractController {
    type = ControllerType.Player;

    @InjectProperty("MaterialStore")
    private materialStore: MaterialStore;

    @InjectProperty("TileStore")
    private tileStore: TileStore;

    @InjectProperty("RouteStore")
    private routeStore: RouteStore;

    @InjectProperty("MeshStore")
    private meshStore: MeshStore;

    @InjectProperty("WorldProvider")
    private worldProvider: WorldProvider;

    @InjectProperty("ToolService")
    private toolService: ToolService;

    route: RouteObj;

    constructor() {
        super();
        this.tileStore = lookup.tileStore;
        this.meshStore = lookup.meshStore;
        this.worldProvider = lookup.worldProvider;
        this.materialStore = lookup.materialStore;
        this.toolService = lookup.toolService;
        this.routeStore = lookup.routeStore;
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

        const deltaTime = this.worldProvider.world.engine.getDeltaTime();

        const selectedTool = this.toolService.getSelectedTool();
        if (selectedTool) {
            selectedTool.beforeRender();
        }

        // const route = this.routeStore.getRouteForCharacter(activePlayer);
        // if (route) {
        //     route.walker.step(deltaTime);
        // }
        
        // activePlayer.walker.walk(deltaTime)
        // activePlayer.animationState.update();
    }

    pointerMove(pointer: PointerData) {
        if (this.toolService.getSelectedTool()) {
            this.toolService.getSelectedTool().pointerMove(pointer);
        }
    }

    pointerDown(pointer: PointerData) {
        if (this.toolService.getSelectedTool()) {
            this.toolService.getSelectedTool().pointerDown(pointer);
        }
    }
}