import { RenderGuiService } from "../../RenderGuiService";

export enum ToolType {
    TRANSFORM = 'TRANSFORM',
    ROTATE = 'ROTATE',
    ROUTE = 'ROUTE',
    ROUTE_CREATE = 'ROUTE CREATE'
}

export class TransformController {
    private readonly renderGuiService: RenderGuiService;
    private _selectedTool: ToolType;


    constructor(renderGuiService: RenderGuiService) {
        this.renderGuiService = renderGuiService;
    }


    set selectedTool(toolType: ToolType) {
        this.renderGuiService.render();
    }

    get selectedTool() {
        return this._selectedTool;
    }
}