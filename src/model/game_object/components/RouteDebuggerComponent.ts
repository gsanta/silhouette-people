import { GameObjectStateType } from "../states/AbstractCharacterState";
import { IComponent } from "./IComponent";
import { GameObject } from "../GameObject";
import { World } from "../../World";
import { SearchingEnemyState } from "../states/SearchingEnemyState";
import { Route } from "../../area/Route";


export class RouteDebuggerComponent implements IComponent {
    private currRoute: Route;
    
    update(gameObject: GameObject, world: World) {
        if (gameObject.state.type !== GameObjectStateType.EnemySearching) {
            if (this.currRoute) {
                world.ai.areaMap.fillPath(this.currRoute.path, 0);
                this.currRoute = undefined;
            }

            return;
        }
        
        const state = <SearchingEnemyState> gameObject.state;
        if (this.currRoute && state.route !== this.currRoute) {
            world.ai.areaMap.fillPath(this.currRoute.path, 0);
        }

        this.currRoute = state.route;
        world.ai.areaMap.fillPath(state.route.path, 2);
        world.debug.areaMapDebugger.update({ height: 0 });
    }
}