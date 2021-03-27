
import { Axis, Space, Vector2, Vector3 } from "babylonjs";
import { World } from "../../services/World";
import { GameObj } from "../objs/GameObj";
import { AbstractGameObjState } from "./AbstractGameObjState";
import { BikeSpeedPhysics } from "./BikeSpeedPhysics";
import { IdleBikeState } from "./IdleBikeState";


export class MovingBikeState extends AbstractGameObjState {
    private readonly world: World;
    private readonly speed = 0.04;
    private readonly rotationSpeed = Math.PI / 30;
    private speedPhysics: BikeSpeedPhysics;
    private vel = 0;
    private startTime = 0;

    constructor(gameObject: GameObj, world: World) {
        super(undefined, gameObject);
        this.world = world;

        const speedRanges: [Vector2, Vector2][] = [
            [ new Vector2(-1.6, -10 / 3.6), new Vector2(1.4, 10 / 3.6) ],
            [ new Vector2(-0.1, 0), new Vector2(2.9, 20) ],
            [ new Vector2(1.4, 10), new Vector2(4.4, 30) ]
        ];

        this.speedPhysics = new BikeSpeedPhysics({ maxAcceleration: 8 / 5, gearSpeedRanges: speedRanges })
    }

    updateInput(): AbstractGameObjState {
        const keyboard = this.world.keyboard;

        const velocity = new Vector3(0, 0, 0);
        const rotation = new Vector3(0, 0, 0);

        this.startTime += this.world.engine.getDeltaTime();

        if (this.world.keyboard.activeKeys.has('w')) {
            this.vel = this.speedPhysics.getSpeed(this.vel, this.world.engine.getDeltaTime());
            console.log(this.vel);
            velocity.z = this.vel * this.world.engine.getDeltaTime() / 1000;
        } else if (this.world.keyboard.activeKeys.has('s')) {
            this.speedPhysics.reset();
            velocity.z = -this.speed;
        } else {
            this.speedPhysics.reset();
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
        direction.normalize().multiplyInPlace(new Vector3(this.gameObject.velocity.z, this.gameObject.velocity.z, this.gameObject.velocity.z));
        mesh.moveWithCollisions(direction);
        mesh.rotate(Axis.Y, this.gameObject.rotation.y, Space.LOCAL);

        return undefined;
    }
}