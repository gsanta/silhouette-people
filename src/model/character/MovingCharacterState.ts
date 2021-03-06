import { Axis, Space, Vector3 } from "babylonjs";
import { GameObject } from "../GameObject";
import { World } from "../World";
import { AbstractCharacterState } from "./ICharacterState";


export class MovingCharacterState extends AbstractCharacterState {
    private readonly speed = 0.04;
    private readonly rotationSpeed = Math.PI / 30;

    updateInput(gameObject: GameObject, world: World): AbstractCharacterState {
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

        return this;
    }

    updatePhysics(gameObject: GameObject, world: World): AbstractCharacterState {
        const mesh = gameObject.colliderMesh ? gameObject.colliderMesh : gameObject.mesh;
        var forward = gameObject.velocity;	
        var direction = gameObject.mesh.getDirection(forward);
        direction.normalize().multiplyInPlace(new Vector3(0.04, 0.04, 0.04));
        mesh.moveWithCollisions(direction);
        mesh.rotate(Axis.Y, gameObject.rotation.y, Space.LOCAL);

        return this;
    }
}