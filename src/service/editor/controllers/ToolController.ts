import { RenderGuiService } from "../../RenderGuiService";
import { TransformTool } from "../tools/TransformTool";
import { ToolType } from "./TransformController";

export class ToolController {

    private readonly renderGuiService: RenderGuiService;
    private _tools: TransformTool[] = [];
    private _activeTool: TransformTool;

    constructor(renderGuiService: RenderGuiService) {
        this.renderGuiService = renderGuiService;
    }

    addTool(tool: TransformTool) {
        this.tools.push(tool);
    }

    set activeTool(tool: TransformTool) {
        if (this.activeTool) {
            this.activeTool.deselect();
        }
        this._activeTool = tool;
        if (this.activeTool) {
            this.activeTool.select();
        }
        this.renderGuiService.render();
    }

    get activeTool(): TransformTool {
        return this._activeTool;
    }

    get tools() {
        return this._tools;
    }

    getToolByType(toolType: ToolType): TransformTool {
        return this._tools.find(tool => tool.toolType === toolType);
    }
}