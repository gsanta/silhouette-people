import { GameObj } from "./objs/GameObj";
import { Lookup } from "../services/Lookup";


export interface IComponent {
    update(gameObject: GameObj, world: Lookup);
}