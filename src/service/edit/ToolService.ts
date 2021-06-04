import { ExecutionTool } from "./execution/ExecutionTool";
import { RouteTool } from "./route/RouteTool";
import { Tool } from "./Tool";
import { InjectProperty } from "../../di/diDecorators";
import { MaterialStore } from "../../store/MaterialStore";
import { MeshStore } from "../../store/MeshStore";
import { RouteStore } from "../../store/RouteStore";
import { RouteFactory } from "../routing/route/RouteFactory";
import { KeyboardListener, KeyboardService } from "../base/keyboard/KeyboardService";
import { lookup } from "../Lookup";
import { RenderGuiService } from "../ui/RenderGuiService";
import { WorldProvider } from "../WorldProvider";
import { CitizenExecutor } from "../citizen/CitizenExecutor";
import { PlayerStore } from "../player/PlayerStore";

export class ToolService implements KeyboardListener {

    path: RouteTool;
    execute: ExecutionTool;

    @InjectProperty("WorldProvider")
    private worldProvider: WorldProvider;

    @InjectProperty("MaterialStore")
    private materialStore: MaterialStore;

    @InjectProperty("MeshStore")
    private meshStore: MeshStore;

    @InjectProperty("PlayerStore")
    private playerStore: PlayerStore;

    @InjectProperty("RouteStore")
    private routeStore: RouteStore;

    @InjectProperty("RouteFactory")
    private routeFactory: RouteFactory;

    @InjectProperty("KeyboardService")
    private keyboardService: KeyboardService;

    @InjectProperty("RenderGuiService")
    private renderGuiService: RenderGuiService;

    private selectedTool: Tool;

    constructor() {
        this.materialStore = lookup.materialStore;
        this.worldProvider = lookup.worldProvider;
        this.meshStore = lookup.meshStore;
        this.keyboardService = lookup.keyboard;
        this.routeStore = lookup.routeStore;
        this.routeFactory = lookup.routeFactory;
        this.renderGuiService = lookup.renderGui;
        this.playerStore = lookup.playerStore;

        this.keyboardService.addListener(this);
        this.path = new RouteTool(this.worldProvider, this.materialStore, this.playerStore, this.renderGuiService, this.routeFactory, this.routeStore);
        this.execute = new ExecutionTool(this.worldProvider, this.playerStore, this.routeStore, this.renderGuiService, this.keyboardService);
    }

    setSelectedTool(tool: Tool, isCanceled = false) {
        this.selectedTool = tool;
        if (this.selectedTool) {
            this.selectedTool.select(isCanceled);
        }
        this.renderGuiService.render();
    }

    getSelectedTool(): Tool {
        return this.selectedTool;
    }

    onKeyDown(e: KeyboardEvent): void {
        this.selectedTool && this.selectedTool.keyDown(e);
    }

    onKeyUp(e: KeyboardEvent): void {
        this.selectedTool && this.selectedTool.keyUp(e);
    }
}