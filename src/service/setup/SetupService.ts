import { RenderGuiService } from "../RenderGuiService";
import { PointerService } from "../input/PointerService";
import { ISetup } from "./ISetup";

export class SetupService {
    private setupObjects: ISetup[] = [];

    private readonly pointerService: PointerService;
    private readonly renderGuiService: RenderGuiService;

    private _isReady = false;

    constructor(pointerService: PointerService, renderGuiService: RenderGuiService) {
        this.pointerService = pointerService;
        this.renderGuiService = renderGuiService;
    }

    isReady() {
        return this._isReady;
    }

    addSetup(setup: ISetup) {
        this.setupObjects.push(setup);
    }

    async setup() {
        for (let obj of this.setupObjects) {
            await obj.setup();
        }
        
        this.pointerService.listen();
        this.renderGuiService.render();

        this._isReady = true;
    }
}