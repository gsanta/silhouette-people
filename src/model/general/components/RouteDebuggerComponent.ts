import { DebugService } from "../../../services/DebugService";
import { Lookup } from "../../../services/Lookup";
import { Route } from "../objs/Route";
import { Character, MeshObj } from "../objs/MeshObj";

export class RouteDebuggerComponent {
    private currRoute: Route;
    private character: Character;
    private debugService: DebugService;

    constructor(character: Character, debugService: DebugService) {
        this.character = character;

        this.debugService = debugService;
    }

    update() {
        const character = this.character;
        const quarterMap = character.getQuarter().getMap();

        if (!character.route || character.route.walker.isFinished()) {
            if (this.currRoute) {
                quarterMap.fillPath(this.currRoute.checkPoints, 0);
                this.currRoute = undefined;
            }

            return;
        }
        
        if (this.currRoute && character.route !== this.currRoute) {
            quarterMap.fillPath(this.currRoute.checkPoints, 0);
        }

        this.currRoute = character.route;
        quarterMap.fillPath(character.route.checkPoints, 2);

        if (this.debugService.areaMapDebugger.isVisible()) {
            this.debugService.areaMapDebugger.update();
        }
    }
}