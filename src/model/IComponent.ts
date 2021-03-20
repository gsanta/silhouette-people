import { GameObj } from "./objs/GameObj";
import { World } from "./World";


export interface IComponent {
    update(gameObject: GameObj, world: World);
}