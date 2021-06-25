import { FogOfWarService } from "../../fow/FogOfWarService";
import { RenderGuiService } from "../../RenderGuiService";

export class FogOfWarController {
    private readonly fogOfWarService: FogOfWarService;
    private readonly renderGuiService: RenderGuiService;

    private _visible = true;

    constructor(fogOfWarService: FogOfWarService, renderGuiService: RenderGuiService) {
        this.fogOfWarService = fogOfWarService;
        this.renderGuiService = renderGuiService;
    }


    set visible(visible: boolean) {
        this._visible = visible;
        this.fogOfWarService.visible = visible;
        this.renderGuiService.render();
    }

    get visible() {
        return this._visible;
    }
}