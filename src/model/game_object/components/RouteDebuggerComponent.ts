import { GameObjectStateType } from "../states/AbstractCharacterState";
import { IComponent } from "./IComponent";
import { GameObject } from "../GameObject";
import { World } from "../../World";
import { SearchingEnemyState } from "../states/SearchingEnemyState";


export class RouteDebuggerComponent implements IComponent {
    private isReady = false;
    
    update(gameObject: GameObject, world: World) {
        if (!this.isReady && gameObject.state.type === GameObjectStateType.EnemySearching) {
            const state = <SearchingEnemyState> gameObject.state;
            world.ai.areaMap.fillPath(state.route.path, 2);
            world.debug.areaMapDebugger.updateColors();
            this.isReady = true;
        }
    }
}