import { GameObject } from "../GameObject";
import { World } from "../World";


export interface IComponent {
    update(gameObject: GameObject, world: World);
}