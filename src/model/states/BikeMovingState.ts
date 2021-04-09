
import { Axis, Space, Vector2, Vector3 } from "babylonjs";
import { Lookup } from "../../services/Lookup";
import { GameObj } from "../objs/GameObj";
import { AbstractGameObjState, GameObjStateName } from "./AbstractGameObjState";
import { BikeSlowdownPhysics } from "./BikeSlowdownPhysics";
import { BikeReversePhysics } from "./BikeReversePhysics";
import { BikeSpeedupPhysics, BikeSpeedState } from "./BikeSpeedupPhysics";

export class BikeMovingState extends AbstractGameObjState {
    private readonly world: Lookup;
    private readonly rotationSpeed = Math.PI / 30;
    private speedPhysics: BikeSpeedupPhysics;
    private rollingPhysics: BikeSlowdownPhysics;
    private brakingPhysics: BikeSlowdownPhysics;
    private reversePhysics: BikeReversePhysics;
    private speed = 0;

    private speedStates: Set<BikeSpeedState> = new Set();

    constructor(gameObject: GameObj, world: Lookup) {
        super(GameObjStateName.BikeMovingState, gameObject);
        this.world = world;

        const speedRanges: [Vector2, Vector2][] = [
            [ new Vector2(-1.6, -10 / 3.6), new Vector2(1.4, 2.5) ],
            [ new Vector2(-0.1, 0), new Vector2(2, 5) ],
            [ new Vector2(1.4, 10 / 3.6), new Vector2(4.4, 7.5) ]
        ];

        this.speedPhysics = new BikeSpeedupPhysics(gameObject, { gearSpeedRanges: speedRanges });
        this.rollingPhysics = new BikeSlowdownPhysics(gameObject, 2.5);
        this.brakingPhysics = new BikeSlowdownPhysics(gameObject, 5);
        this.reversePhysics = new BikeReversePhysics(gameObject);
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
                    this.speedStates.add(BikeSpeedState.Braking);
                break;
                case 'r':
                    this.speedStates.add(BikeSpeedState.Reverse);
                break;
            }
        } else {
            switch(e.key) {
                case 'w':
                    this.speedStates.delete(BikeSpeedState.Accelerating);
                break;
                case 's':
                    this.speedStates.delete(BikeSpeedState.Braking);
                break;
                case 'r':
                    this.speedStates.delete(BikeSpeedState.Reverse);
                break;
            }
        }
    }

    private updateSpeed() {
        const deltaTime = this.world.engine.getDeltaTime();
        const deltaTimeSec = deltaTime / 1000;

        const dominantState = this.getDominantSpeedState();

        switch(dominantState) {
            case BikeSpeedState.Accelerating:
                this.speedPhysics.update(deltaTime);
            break;
            case BikeSpeedState.Braking:
                this.brakingPhysics.update(deltaTime);
            break;
            case BikeSpeedState.Reverse:
                this.reversePhysics.update(deltaTime);
            break;
            case BikeSpeedState.Rolling:
                this.rollingPhysics.update(deltaTime);
            break;
        }

        this.speed = this.gameObject.data.getSpeed() * deltaTimeSec;
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

    private updateMovement() {
        const mesh = this.gameObject.colliderMesh ? this.gameObject.colliderMesh : this.gameObject.mainMesh;

        const relativeDir = new Vector3(0, 0, 1);

        var direction = this.gameObject.colliderMesh.getDirection(relativeDir);
        direction.normalize().multiplyInPlace(new Vector3(this.speed, this.speed, this.speed));
        mesh.moveWithCollisions(direction);

        mesh.rotate(Axis.Y, this.gameObject.rotation.y, Space.LOCAL);
    }

    update(): void {
        this.updateSpeed();
        this.updateRotation();
        this.updateMovement();
    }

    enter() {
        this.gameObject.runAnimation('Go');
    }

    exit() {
        this.gameObject.stopCurrentAnimation();
    }

    private getDominantSpeedState(): BikeSpeedState {
        const speed = this.gameObject.data.getSpeed();
        if (this.speedStates.has(BikeSpeedState.Braking)) {
            return BikeSpeedState.Braking;
        } else if (this.speedStates.has(BikeSpeedState.Accelerating)) {
            return BikeSpeedState.Accelerating;
        } else if (this.speedStates.has(BikeSpeedState.Reverse) && speed <= 0) {
            return BikeSpeedState.Reverse;
        } else {
            return BikeSpeedState.Rolling;
        }
    }
}