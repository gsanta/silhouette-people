import { Axis, Space, Vector3 } from "babylonjs";
import { GameObj } from "../objs/GameObj";
import { World } from "../../services/World";
import { AbstractGameObjState, GameObjStateName } from "./AbstractGameObjState";
import { PlayerIdleState } from "./PlayerIdleState";

export class PlayerMovingState extends AbstractGameObjState {
    private readonly world: World;
    private readonly speed = 0.04;
    private readonly rotationSpeed = Math.PI / 30;

    constructor(gameObject: GameObj, world: World) {
        super(GameObjStateName.PlayerMovingState, gameObject);
        this.world = world;

        this.updateKeyboard();
    }

    keyboard() {
        this.updateKeyboard();
    }

    private updateKeyboard() {
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
            this.gameObject.state.setState(new PlayerIdleState(this.gameObject, this.world));
        }
    }

    update(): void {
        const mesh = this.gameObject.colliderMesh ? this.gameObject.colliderMesh : this.gameObject.mainMesh;
        var forward = this.gameObject.velocity;	
        var direction = this.gameObject.mainMesh.getDirection(forward);
        direction.normalize().multiplyInPlace(new Vector3(0.04, 0.04, 0.04));
        mesh.moveWithCollisions(direction);
        mesh.rotate(Axis.Y, this.gameObject.rotation.y, Space.WORLD);
    }

    enter() {
        this.gameObject.runAnimation('Walk');
    }

    exit() {
        this.gameObject.stopCurrentAnimation();
    }
}