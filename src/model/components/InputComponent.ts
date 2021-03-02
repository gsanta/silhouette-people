import { Vector3 } from "babylonjs";
import { GameObject } from "../GameObject";
import { World } from "../World";
import { IComponent } from "./IComponent";



export class InputComponent implements IComponent {
    private speed = 0.02;

    update(gameObject: GameObject, world: World) {
        const velocity = new Vector3(0, 0, 0);


        if (world.keyboard.activeKeys.has('w')) {
            velocity.z = this.speed; 
        } else if (world.keyboard.activeKeys.has('s')) {
            velocity.z = -this.speed;
        } else {
            velocity.z = 0;
        }

        gameObject.velocity = velocity;
    }
}