import { FogOfWarService } from "../../fow/FogOfWarService";
import { RenderGuiService } from "../../RenderGuiService";

export class FogOfWarController {
    private readonly fogOfWarService: FogOfWarService;
    private readonly renderGuiService: RenderGuiService;

    constructor(fogOfWarService: FogOfWarService, renderGuiService: RenderGuiService) {
        this.fogOfWarService = fogOfWarService;
        this.renderGuiService = renderGuiService;
    }


    set enabled(enabled: boolean) {
        if (enabled) {
            this.fogOfWarService.enable();
        } else {
            this.fogOfWarService.disable();
        }
        this.renderGuiService.render();
    }

    get enabled() {
        return this.fogOfWarService.isEnabled();
    }
}