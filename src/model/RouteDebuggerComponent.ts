import { DebugService } from "../service/base/debug/DebugService";
import { CharacterObj } from "./object/character/CharacterObj";
import { RouteObj } from "./object/route/RouteObj";

export class RouteDebuggerComponent {
    private currRoute: RouteObj;
    private character: CharacterObj;
    private debugService: DebugService;

    constructor(character: CharacterObj, debugService: DebugService) {
        this.character = character;

        this.debugService = debugService;
    }

    update() {
        const character = this.character;
        const quarterMap = character.getQuarter().getMap();

        if (!character.route || character.route.walker.isFinished()) {
            if (this.currRoute) {
                quarterMap.fillPath(this.currRoute.getCheckpoints(), 0);
                this.currRoute = undefined;
            }

            return;
        }
        
        if (this.currRoute && character.route !== this.currRoute) {
            quarterMap.fillPath(this.currRoute.getCheckpoints(), 0);
        }

        this.currRoute = character.route;
        quarterMap.fillPath(character.route.getCheckpoints(), 2);

        if (this.debugService.areaMapDebugger.isVisible()) {
            this.debugService.areaMapDebugger.update();
        }
    }
}