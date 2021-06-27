import { RenderGuiService } from "../../RenderGuiService";
import { Tool } from "../tools/Tool";
import { ToolType } from "./TransformController";

export class ToolController {

    private readonly renderGuiService: RenderGuiService;
    private _tools: Tool[] = [];
    private _activeTool: Tool;

    constructor(renderGuiService: RenderGuiService) {
        this.renderGuiService = renderGuiService;
    }

    addTool(tool: Tool) {
        this.tools.push(tool);
    }

    set activeTool(tool: Tool) {
        if (this.activeTool) {
            this.activeTool.deselect();
        }
        this._activeTool = tool;
        if (this.activeTool) {
            this.activeTool.select();
        }
        this.renderGuiService.render();
    }

    get activeTool(): Tool {
        return this._activeTool;
    }

    get tools() {
        return this._tools;
    }

    getToolByType(toolType: ToolType): Tool {
        return this._tools.find(tool => tool.toolType === toolType);
    }
}