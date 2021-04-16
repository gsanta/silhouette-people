import { MeshStateName } from "../states/AbstractMeshState";
import { IComponent } from "../IComponent";
import { Character, MeshObj } from "../objs/MeshObj";
import { Lookup } from "../../services/Lookup";
import { EnemyMovingState } from "../states/EnemyMovingState";
import { Route } from "../district/Route";

export class RouteDebuggerComponent implements IComponent {
    private currRoute: Route;
    
    update(character: Character, world: Lookup) {
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

        if (world.debug.areaMapDebugger.isVisible()) {
            world.debug.areaMapDebugger.update();
        }
    }
}