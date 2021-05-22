import { WorldProvider } from "../../../../service/WorldProvider";
import { CharacterItem } from "../../character/CharacterItem";
import { BikeWalker } from "../states/BikeWalker";
import { AbstractBikePhysics } from "./AbstractBikePhysics";
import { BrakingParticleSystem } from "./BrakingParticleSystem";

export class BikeBrakingPhysics extends AbstractBikePhysics {
    private bikeWalker: BikeWalker;
    private readonly slowdown: number;
    private readonly worldProvider: WorldProvider;
    private particleSystem: BrakingParticleSystem;
    private bike: CharacterItem;

    constructor(worldProvider: WorldProvider, bike: CharacterItem, bikeWalker: BikeWalker, slowdownFactor: number) {
        super();
        this.bikeWalker = bikeWalker;
        this.worldProvider = worldProvider;

        this.slowdown = slowdownFactor / 1000;
        this.bike = bike;
        this.particleSystem = new BrakingParticleSystem(this.bike, this.worldProvider);
    }

    update(deltaTime: number) {
        const slowdownAmount = deltaTime * this.slowdown;
        const speed = this.bikeWalker.getSpeed();
        let newSpeed = speed - slowdownAmount;

        if (newSpeed < 0) {
            newSpeed = 0;
        }

        this.bikeWalker.setSpeed(newSpeed);
    }

    enter() {
        this.particleSystem.dispose();
        this.particleSystem.create();
    }

    exit() {
        this.particleSystem.dispose();
    }
}