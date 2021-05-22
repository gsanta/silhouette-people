import { WorldProvider } from "../../../../service/WorldProvider";
import { CharacterItem } from "../../character/CharacterItem";
import { MeshMover } from "../../mesh/MeshMover";
import { BrakingParticleSystem } from "./BrakingParticleSystem";

export class BrakingSystem {
    private mover: MeshMover;
    private readonly slowdown: number;
    private readonly slowdownPowerBrake: number;
    private readonly worldProvider: WorldProvider;
    private particleSystem: BrakingParticleSystem;
    private bike: CharacterItem;
    private isPowerBraking = false;

    constructor(worldProvider: WorldProvider, bike: CharacterItem, mover: MeshMover, slowdownFactor: number) {
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