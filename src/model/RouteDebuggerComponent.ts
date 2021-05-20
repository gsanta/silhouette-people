import { DebugService } from "../service/base/debug/DebugService";
import { CharacterItem } from "./item/character/CharacterItem";
import { RouteItem } from "./item/route/RouteItem";
import { RouteWalkerState } from "./item/route/RouteWalker";

export class RouteDebuggerComponent {
    private currRoute: RouteItem;
    private character: CharacterItem;
    private debugService: DebugService;

    constructor(character: CharacterItem, debugService: DebugService) {
        this.character = character;

        this.debugService = debugService;
    }

    update() {
        const character = this.character;
        const quarterMap = character.getQuarter().getMap();

        if (!character.route || character.route.walker.getState() === RouteWalkerState.FINISHED) {
            if (this.currRoute) {
                quarterMap.fillPath(this.currRoute.getEdges().map(point => point.p), 0);
                this.currRoute = undefined;
            }

            return;
        }
        
        if (this.currRoute && character.route !== this.currRoute) {
            quarterMap.fillPath(this.currRoute.getEdges().map(point => point.p), 0);
        }

        this.currRoute = character.route;
        quarterMap.fillPath(character.route.getEdges().map(point => point.p), 2);

        if (this.debugService.areaMapDebugger.isVisible()) {
            this.debugService.areaMapDebugger.update();
        }
    }
}