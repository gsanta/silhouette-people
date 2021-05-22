import { BikeWalker } from "../states/BikeWalker";
import { BikeReversePhysics } from "./BikeReversePhysics";
import { BikeSlowdownPhysics } from "./BikeSlowdownPhysics";
import { BikeSpeedupPhysics } from "./BikeSpeedupPhysics";
import { AbstractBikePhysics } from "./AbstractBikePhysics";
import { BikeBrakingPhysics } from "./BikeBrakingPhysics";
import { lookup } from "../../../../service/Lookup";
import { CharacterItem } from "../../character/CharacterItem";

export class BikeMasterPhysics extends AbstractBikePhysics {
    private bikeWalker: BikeWalker;

    private speedUpPhysics: BikeSpeedupPhysics;
    private rollingPhysics: BikeSlowdownPhysics;
    private brakingPhysics: BikeBrakingPhysics;
    private reversePhysics: BikeReversePhysics;
    private currentPhysics: AbstractBikePhysics;

    constructor(bike: CharacterItem, bikeWalker: BikeWalker) {
        super();
        this.bikeWalker = bikeWalker;

        this.speedUpPhysics = new BikeSpeedupPhysics(this.bikeWalker);
        this.rollingPhysics = new BikeSlowdownPhysics(this.bikeWalker, 1);
        this.brakingPhysics = new BikeBrakingPhysics(lookup.worldProvider, bike, this.bikeWalker, 1.5);
        this.reversePhysics = new BikeReversePhysics(this.bikeWalker);
    }

    update(deltaTime: number) {
        const newPhysics = this.determinePhysics();
        if (this.currentPhysics !== newPhysics) {
            if (this.currentPhysics) {
                this.currentPhysics.exit();
            }

            if (newPhysics) {
                newPhysics.enter();
            }
            this.currentPhysics = newPhysics;
        }

        if (this.currentPhysics) {
            this.currentPhysics.update(deltaTime);
        }
    }

    private determinePhysics(): AbstractBikePhysics {
        const speed = this.bikeWalker.getSpeed();
        if (this.bikeWalker.isBraking()) {
            return this.brakingPhysics;
        } else if (this.bikeWalker.isPedalling()) {
            if (this.bikeWalker.getPedalDirection() === 'forward') {
                return this.speedUpPhysics;
            } else if (speed <= 0) {
                return this.reversePhysics;
            }
        } else {
            return this.rollingPhysics;
        }
    }
}