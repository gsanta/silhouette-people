import { GameObject } from "../GameObject";
import { World } from "../World";
import { IComponent } from "./IComponent";


export class PhysicsComponent implements IComponent {
    
    update(gameObject: GameObject, world: World) {
        gameObject.mesh.moveWithCollisions(gameObject.velocity);
    }
}