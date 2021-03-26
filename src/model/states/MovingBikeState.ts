
import { Axis, Space, Vector3 } from "babylonjs";
import { GameObj } from "../objs/GameObj";
import { World } from "../../services/World";
import { AbstractGameObjState, GameObjectStateType } from "./AbstractGameObjState";
import { IdlePlayerState } from "./IdlePlayerState";
import { IdleBikeState } from "./IdleBikeState";
import { BikeSpeedPhysics } from "./BikeSpeedPhysics";


export class MovingBikeState extends AbstractGameObjState {
    private readonly world: World;
    private readonly speed = 0.04;
    private readonly rotationSpeed = Math.PI / 30;
    private speedPhysics: BikeSpeedPhysics;
    private vel = 0;

    constructor(gameObject: GameObj, world: World) {
        super(undefined, gameObject);
        this.world = world;

        this.speedPhysics = new BikeSpeedPhysics({ maxAcceleration: 8 / 5, gearSpeedRanges: [[-11, 9], [-1, 19], [9, 29]]})
    }

    updateInput(): AbstractGameObjState {
        const keyboard = this.world.keyboard;

        const velocity = new Vector3(0, 0, 0);
        const rotation = new Vector3(0, 0, 0);

        
        console.log(this.vel)
        
        if (this.world.keyboard.activeKeys.has('w')) {
            this.vel = this.speedPhysics.getSpeed(this.vel, this.world.engine.getDeltaTime());
            velocity.z = this.vel; 
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
            return new IdleBikeState(this.gameObject, this.world);
        }

        return undefined;
    }

    updatePhysics(): AbstractGameObjState {
        const mesh = this.gameObject.colliderMesh ? this.gameObject.colliderMesh : this.gameObject.mainMesh;
        var forward = this.gameObject.velocity;	
        var direction = this.gameObject.mainMesh.getDirection(forward);
        direction.normalize().multiplyInPlace(new Vector3(0.04, 0.04, 0.04));
        mesh.moveWithCollisions(direction);
        mesh.rotate(Axis.Y, this.gameObject.rotation.y, Space.LOCAL);

        return undefined;
    }
}