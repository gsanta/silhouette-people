import { PathTool } from "../controllers/PathTool";
import { Tool } from "../controllers/Tool";
import { InjectProperty } from "../di/diDecorators";
import { MaterialStore } from "../stores/MaterialStore";
import { MeshStore } from "../stores/MeshStore";
import { lookup } from "./Lookup";
import { WorldProvider } from "./WorldProvider";


export class ToolService {

    path: PathTool;

    @InjectProperty("WorldProvider")
    private worldProvider: WorldProvider;

    @InjectProperty("MaterialStore")
    private materialStore: MaterialStore;

    @InjectProperty("MeshStore")
    private meshStore: MeshStore;

    private selectedTool: Tool;

    constructor() {
        this.materialStore = lookup.materialStore;
        this.worldProvider = lookup.worldProvider;
        this.meshStore = lookup.meshStore;
        this.path = new PathTool(this.worldProvider, this.materialStore, this.meshStore);
    }


    setSelectedTool(tool: Tool) {
        this.selectedTool = tool;
        if (this.selectedTool) {
            this.selectedTool.select();
        }
    }

    getSelectedTool(): Tool {
        return this.selectedTool;
    }
}