import { WorldProvider } from "../../../../../../service/WorldProvider";
import { MotionController } from "../../../MotionController";
import { GameObject } from "../../../GameObject";
import { BrakingParticleSystem } from "./BrakingParticleSystem";

export class BrakingSystem {
    private mover: MotionController;
    private readonly slowdown: number;
    private readonly slowdownPowerBrake: number;
    private readonly worldProvider: WorldProvider;
    private particleSystem: BrakingParticleSystem;
    private bike: GameObject;
    private isPowerBraking = false;

    constructor(worldProvider: WorldProvider, bike: GameObject, mover: MotionController, slowdownFactor: number) {
        this.mover = mover;
        this.worldProvider = worldProvider;

        this.slowdown = slowdownFactor / 1000;
        this.slowdownPowerBrake = 4 / 1000;
        this.bike = bike;
        this.particleSystem = new BrakingParticleSystem(this.bike, this.worldProvider);
    }

    break(deltaTime: number, powerBrake: boolean) {
        this.handlePowerBrake(powerBrake);
        const slowdown = powerBrake ? this.slowdownPowerBrake : this.slowdown;
        const slowdownAmount = deltaTime * slowdown;
        const speed = this.mover.getSpeed();
        let newSpeed = speed - slowdownAmount;

        if (newSpeed < 0) {
            newSpeed = 0;
        }

        this.mover.setSpeed(newSpeed);
    }

    private handlePowerBrake(newPowerBrakeState: boolean) {
        if (this.isPowerBraking && !newPowerBrakeState) {
            this.particleSystem.dispose();
        } else if (!this.isPowerBraking && newPowerBrakeState) {
            this.particleSystem.dispose();
            this.particleSystem.create();
        }
        this.isPowerBraking = newPowerBrakeState;
    }

    enter() {
        // this.particleSystem.dispose();
        // this.particleSystem.create();
    }

    exit() {
        this.particleSystem.dispose();
    }
}