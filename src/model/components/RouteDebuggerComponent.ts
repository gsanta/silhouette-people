import { GameObjectStateType } from "../states/AbstractCharacterState";
import { IComponent } from "../IComponent";
import { GameObj } from "../objs/GameObj";
import { World } from "../../services/World";
import { SearchingEnemyState } from "../states/SearchingEnemyState";
import { Route } from "../district/Route";

export class RouteDebuggerComponent implements IComponent {
    private currRoute: Route;
    
    update(gameObject: GameObj, world: World) {
        const quarterMap = gameObject.getQuarter().getMap();

        if (gameObject.states.currState.type !== GameObjectStateType.EnemySearching) {
            if (this.currRoute) {
                quarterMap.fillPath(this.currRoute.path, 0);
                this.currRoute = undefined;
            }

            return;
        }
        
        const state = <SearchingEnemyState> gameObject.states.currState;
        if (this.currRoute && state.route !== this.currRoute) {
            quarterMap.fillPath(this.currRoute.path, 0);
        }

        this.currRoute = state.route;
        quarterMap.fillPath(state.route.path, 2);

        if (world.debug.areaMapDebugger.isVisible()) {
            world.debug.areaMapDebugger.update();
        }
    }
}