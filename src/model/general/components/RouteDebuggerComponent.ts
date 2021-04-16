import { DebugService } from "../../../services/DebugService";
import { Lookup } from "../../../services/Lookup";
import { Route } from "../../district/Route";
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

        if (!character.route || character.route.isFinished) {
            if (this.currRoute) {
                quarterMap.fillPath(this.currRoute.path, 0);
                this.currRoute = undefined;
            }

            return;
        }
        
        if (this.currRoute && character.route !== this.currRoute) {
            quarterMap.fillPath(this.currRoute.path, 0);
        }

        this.currRoute = character.route;
        quarterMap.fillPath(character.route.path, 2);

        if (this.debugService.areaMapDebugger.isVisible()) {
            this.debugService.areaMapDebugger.update();
        }
    }
}