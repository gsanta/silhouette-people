import { Vector3 } from "babylonjs";
import { GameObject } from "../GameObject";
import { World } from "../World";
import { IComponent } from "./IComponent";

export class InputComponent implements IComponent {
    private speed = 0.04;
    private rotationSpeed = Math.PI / 30;

    update(gameObject: GameObject, world: World) {
        const velocity = new Vector3(0, 0, 0);
        const rotation = new Vector3(0, 0, 0);

        if (world.keyboard.activeKeys.has('w')) {
            velocity.z = this.speed; 
        } else if (world.keyboard.activeKeys.has('s')) {
            velocity.z = -this.speed;
        } else {
            velocity.z = 0;
        }

        if (world.keyboard.activeKeys.has('a')) {
            rotation.y -= this.rotationSpeed;
        } else if (world.keyboard.activeKeys.has('d')) {
            rotation.y += this.rotationSpeed;
        }

        gameObject.velocity = velocity;
        gameObject.rotation = rotation;
    }
}