import { Axis, Space, Vector3 } from "babylonjs";
import { MeshObj } from "../objs/MeshObj";
import { lookup, Lookup } from "../../services/Lookup";
import { AbstractMeshObjState, MeshObjStateName } from "./AbstractMeshObjState";
import { PlayerIdleState } from "./PlayerIdleState";
import { InjectProperty } from "../../di/diDecorators";
import { KeyboardService } from "../../services/KeyboardService";

export class PlayerMovingState extends AbstractMeshObjState {

    @InjectProperty("KeyboardService")
    private keyboardService: KeyboardService;

    private readonly speed = 0.04;
    private readonly rotationSpeed = Math.PI / 30;

    constructor(gameObject: MeshObj) {
        super(MeshObjStateName.PlayerMovingState, gameObject);
        this.keyboardService = lookup.keyboard;
        this.updateKeyboard();
    }

    keyboard() {
        this.updateKeyboard();
    }

    private updateKeyboard() {
        const velocity = new Vector3(0, 0, 0);
        const rotation = new Vector3(0, 0, 0);

        if (this.keyboardService.activeKeys.has('w')) {
            velocity.z = this.speed; 
        } else if (this.keyboardService.activeKeys.has('s')) {
            velocity.z = -this.speed;
        } else {
            velocity.z = 0;
        }

        if (this.keyboardService.activeKeys.has('a')) {
            rotation.y -= this.rotationSpeed;
        } else if (this.keyboardService.activeKeys.has('d')) {
            rotation.y += this.rotationSpeed;
        }

        this.gameObject.velocity = velocity;
        this.gameObject.rotation = rotation;

        if (
            !this.keyboardService.checker.isMoveForward() &&
            !this.keyboardService.checker.isMoveBackward() &&
            !this.keyboardService.checker.isTurnLeft() &&
            !this.keyboardService.checker.isTurnRight()
        ) {
            this.gameObject.state.setState(new PlayerIdleState(this.gameObject));
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