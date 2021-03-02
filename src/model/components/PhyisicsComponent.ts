import { Axis, Space, Vector3 } from "babylonjs";
import { GameObject } from "../GameObject";
import { World } from "../World";
import { IComponent } from "./IComponent";



export class PhysicsComponent implements IComponent {
    
    update(gameObject: GameObject, world: World) {
        
        var forward = gameObject.velocity;	
        var direction = gameObject.mesh.getDirection(forward);
        direction.normalize().multiplyInPlace(new Vector3(0.04, 0.04, 0.04));
        gameObject.mesh.moveWithCollisions(direction);
        gameObject.mesh.rotate(Axis.Y, gameObject.rotation.y, Space.LOCAL);
    }
}