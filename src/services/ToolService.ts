import { MoveTool } from "../controllers/MoveTool";
import { PathTool } from "../controllers/PathTool";
import { Tool } from "../controllers/Tool";
import { InjectProperty } from "../di/diDecorators";
import { MaterialStore } from "../stores/MaterialStore";
import { MeshStore } from "../stores/MeshStore";
import { RouteStore } from "../stores/RouteStore";
import { KeyboardListener, KeyboardService } from "./input/KeyboardService";
import { lookup } from "./Lookup";
import { RenderGuiService } from "./RenderGuiService";
import { WorldProvider } from "./WorldProvider";

export class ToolService implements KeyboardListener {

    path: PathTool;
    move: MoveTool;

    @InjectProperty("WorldProvider")
    private worldProvider: WorldProvider;

    @InjectProperty("MaterialStore")
    private materialStore: MaterialStore;

    @InjectProperty("MeshStore")
    private meshStore: MeshStore;

    @InjectProperty("RouteStore")
    private routeStore: RouteStore;

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
        this.renderGuiService = lookup.renderGui;

        this.keyboardService.addListener(this);
        this.path = new PathTool(this.worldProvider, this, this.materialStore, this.meshStore, this.routeStore, this.renderGuiService);
        this.move = new MoveTool(this.worldProvider, this.meshStore, this.routeStore, this.renderGuiService);
        
        this.setSelectedTool(this.path, true);
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