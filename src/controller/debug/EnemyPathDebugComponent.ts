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
            const areaMap = world.ai.areaMap;
            world.ai.areaMap.fillPath(state.path, 2);
            world.debug.areaMapDebugger.updateColors();
            this.isReady = true;

            let str = ''

            const arr: number[][] = [];
    
            for (let i = 0; i < areaMap.rows; i++) {
                arr.push([]);
                str += '\n';
                for (let j = 0; j < areaMap.columns; j++) {
                    const index = areaMap.getIndexAtGridCoordinate(j, i);
                    arr[i][j] = areaMap.isBlocked(index) ? 0 : 1;
                    str += arr[i][j]
                }
            }
    
            console.log(str);
        }
    }
}