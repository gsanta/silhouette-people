import { MeshObjStateName } from "../states/AbstractMeshObjState";
import { IComponent } from "../IComponent";
import { MeshObj } from "../objs/MeshObj";
import { Lookup } from "../../services/Lookup";
import { EnemyMovingState } from "../states/EnemyMovingState";
import { Route } from "../district/Route";

export class RouteDebuggerComponent implements IComponent {
    private currRoute: Route;
    
    update(gameObject: MeshObj, world: Lookup) {
        const quarterMap = gameObject.getQuarter().getMap();

        if (gameObject.state.currState.type !== MeshObjStateName.EnemyMovingState) {
            if (this.currRoute) {
                quarterMap.fillPath(this.currRoute.path, 0);
                this.currRoute = undefined;
            }

            return;
        }
        
        const state = <EnemyMovingState> gameObject.state.currState;
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