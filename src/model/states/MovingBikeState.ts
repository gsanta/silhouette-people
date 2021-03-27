
import { Axis, Space, Vector2, Vector3 } from "babylonjs";
import { World } from "../../services/World";
import { GameObj } from "../objs/GameObj";
import { AbstractGameObjState } from "./AbstractGameObjState";
import { BikeSpeedPhysics, BikeSpeedState } from "./BikeSpeedPhysics";
import { IdleBikeState } from "./IdleBikeState";

export class MovingBikeState extends AbstractGameObjState {
    private readonly world: World;
    private readonly rotationSpeed = Math.PI / 30;
    private speedPhysics: BikeSpeedPhysics;
    private speed = 0;
    private instantaneousSpeed = 0;

    private speedStates: Set<BikeSpeedState> = new Set();

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

    keyboard(e: KeyboardEvent, isKeyDown: boolean) {
        if (isKeyDown) {
            switch(e.key) {
                case '1':
                    this.speedPhysics.setGear(0);
                break;
                case '2':
                    this.speedPhysics.setGear(1);
                break;
                case '3':
                    this.speedPhysics.setGear(2);
                break;
                case 'w':
                    this.speedStates.add(BikeSpeedState.Accelerating);
                break;
                case 's':
                    this.speedStates.add(BikeSpeedState.Reverse);
                break;
            }
        } else {
            switch(e.key) {
                case 'w':
                    this.speedStates.delete(BikeSpeedState.Accelerating);
                break;
                case 's':
                    this.speedStates.delete(BikeSpeedState.Reverse);
                break;
            }
        }

        return undefined;
    }

    private updateSpeed() {
        const deltaTime = this.world.engine.getDeltaTime();
        const deltaTimeSec = deltaTime / 1000;

        if (this.speedStates.has(BikeSpeedState.Accelerating)) {
            this.instantaneousSpeed = this.speedPhysics.accelerate(this.instantaneousSpeed, deltaTime);
            this.speed = this.instantaneousSpeed * deltaTimeSec;
        } else if (this.speedStates.has(BikeSpeedState.Reverse)) {
            this.speed = this.speedPhysics.reverse();
        } else {
            this.instantaneousSpeed = 0;
            this.speed = this.speedPhysics.brake();
        }
    }

    private updateRotation() {
        const rotation = new Vector3(0, 0, 0);

        if (this.world.keyboard.activeKeys.has('a')) {
            rotation.y -= this.rotationSpeed;
        } else if (this.world.keyboard.activeKeys.has('d')) {
            rotation.y += this.rotationSpeed;
        }

        this.gameObject.rotation = rotation;
    }

    private getStateTransitionIfNeeded(): AbstractGameObjState {
        const keyboard = this.world.keyboard;

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

    private updateMovement() {
        const mesh = this.gameObject.colliderMesh ? this.gameObject.colliderMesh : this.gameObject.mainMesh;

        const relativeDir = new Vector3(0, 0, 1);

        var direction = this.gameObject.mainMesh.getDirection(relativeDir);
        direction.normalize().multiplyInPlace(new Vector3(this.speed, this.speed, this.speed));
        mesh.moveWithCollisions(direction);
        mesh.rotate(Axis.Y, this.gameObject.rotation.y, Space.LOCAL);
    }

    updateInput(): AbstractGameObjState {
        // const deltaTime = this.world.engine.getDeltaTime();
        // const deltaTimeSec = deltaTime / 1000;
        // const keyboard = this.world.keyboard;
        // const rotation = new Vector3(0, 0, 0);

        // if (this.world.keyboard.activeKeys.has('w')) {
        //     this.instantaneousSpeed = this.speedPhysics.accelerate(this.instantaneousSpeed, deltaTime);
        //     this.speed = this.instantaneousSpeed * deltaTimeSec;
        // } else if (this.world.keyboard.activeKeys.has('s')) {
        //     this.speed = this.speedPhysics.reverse();
        // } else {
        //     this.speed = this.speedPhysics.brake();
        // }

        // if (this.world.keyboard.activeKeys.has('a')) {
        //     rotation.y -= this.rotationSpeed;
        // } else if (this.world.keyboard.activeKeys.has('d')) {
        //     rotation.y += this.rotationSpeed;
        // }

        // this.gameObject.rotation = rotation;

        // if (
        //     !keyboard.checker.isMoveForward() &&
        //     !keyboard.checker.isMoveBackward() &&
        //     !keyboard.checker.isTurnLeft() &&
        //     !keyboard.checker.isTurnRight()
        // ) {
        //     return new IdleBikeState(this.gameObject, this.world);
        // }

        return undefined;
    }

    updatePhysics(): AbstractGameObjState {
        console.log('speed: ' + this.speed)
        this.updateSpeed();
        this.updateRotation();
        this.updateMovement();
        return undefined;
        // return this.getStateTransitionIfNeeded();
        // const mesh = this.gameObject.colliderMesh ? this.gameObject.colliderMesh : this.gameObject.mainMesh;

        // const relativeDir = new Vector3(0, 0, 1);

        // var direction = this.gameObject.mainMesh.getDirection(relativeDir);
        // direction.normalize().multiplyInPlace(new Vector3(this.speed, this.speed, this.speed));
        // mesh.moveWithCollisions(direction);
        // mesh.rotate(Axis.Y, this.gameObject.rotation.y, Space.LOCAL);

        // return undefined;
    }
}