import { Axis, Space, Vector3 } from "babylonjs";
import { GameObj } from "../objs/GameObj";
import { World } from "../../services/World";
import { AbstractCharacterState, GameObjectStateType } from "./AbstractCharacterState";
import { IdleCharacterState } from "./IdleCharacterState";


export class MovingCharacterState extends AbstractCharacterState {
    private readonly world: World;
    private readonly speed = 0.04;
    private readonly rotationSpeed = Math.PI / 30;

    constructor(gameObject: GameObj, world: World) {
        super(GameObjectStateType.Walking, gameObject);
        this.world = world;
    }

    updateInput(): AbstractCharacterState {
        const keyboard = this.world.keyboard;

        const velocity = new Vector3(0, 0, 0);
        const rotation = new Vector3(0, 0, 0);

        if (this.world.keyboard.activeKeys.has('w')) {
            velocity.z = this.speed; 
        } else if (this.world.keyboard.activeKeys.has('s')) {
            velocity.z = -this.speed;
        } else {
            velocity.z = 0;
        }

        if (this.world.keyboard.activeKeys.has('a')) {
            rotation.y -= this.rotationSpeed;
        } else if (this.world.keyboard.activeKeys.has('d')) {
            rotation.y += this.rotationSpeed;
        }

        this.gameObject.velocity = velocity;
        this.gameObject.rotation = rotation;

        if (
            !keyboard.checker.isMoveForward() &&
            !keyboard.checker.isMoveBackward() &&
            !keyboard.checker.isTurnLeft() &&
            !keyboard.checker.isTurnRight()
        ) {
            return new IdleCharacterState(this.gameObject, this.world);
        }

        return undefined;
    }

    updateAnimation(): void {
        if (!this.gameObject.isAnimationRunning('Walk')) {
            this.gameObject.runAnimation('Walk');
        }
    }

    updatePhysics(): AbstractCharacterState {
        const mesh = this.gameObject.colliderMesh ? this.gameObject.colliderMesh : this.gameObject.mainMesh;
        var forward = this.gameObject.velocity;	
        var direction = this.gameObject.mainMesh.getDirection(forward);
        direction.normalize().multiplyInPlace(new Vector3(0.04, 0.04, 0.04));
        mesh.moveWithCollisions(direction);
        mesh.rotate(Axis.Y, this.gameObject.rotation.y, Space.LOCAL);

        return undefined;
    }

    exit() {
        this.gameObject.stopCurrentAnimation();
    }
}