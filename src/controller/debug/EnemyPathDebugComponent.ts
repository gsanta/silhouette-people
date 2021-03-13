import { GameObjectStateType } from "../../model/character/AbstractCharacterState";
import { IComponent } from "../../model/components/IComponent";
import { GameObject } from "../../model/GameObject";
import { World } from "../../model/World";
import { SearchingEnemyState } from "../ai/SearchingEnemyState";


export class EnemyPathDebugComponent implements IComponent {
    private isReady = false;
    
    update(gameObject: GameObject, world: World) {
        if (!this.isReady && gameObject.state.type === GameObjectStateType.EnemySearching) {
            const state = <SearchingEnemyState> gameObject.state;

            world.areaMap.fillPath(state.path, 2);
        }
    }
}