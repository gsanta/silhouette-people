import { Vector2 } from "babylonjs";

export const defaultGearRatios: {[key: string]: number} = {
    '1': 2.66,
    '2': 1.78,
    '3': 1.30,
    '4': 1.0,
    '5': 0.74,
    '6': 0.5
};

export class BicycleVelocityPhysics {
    private gearRatios = defaultGearRatios;

    private torque = 20;
    private friction = 10;

    private mass = 60;
    private wheelRadius = 0.3;
    
    private gearRatioVec: Vector2;
    private wheelRadiusVec: Vector2;
    private massVec: Vector2;

    private velocityVec: Vector2;
    private directionVec: Vector2;
    private torqueVec: Vector2;
    private frictionVec: Vector2;

    constructor() {
        this.gearRatioVec = this.toVec(1);
        this.wheelRadiusVec = this.toVec(this.wheelRadius);
        this.massVec = this.toVec(this.mass);
        this.torqueVec = this.toVec(this.torque);
        this.frictionVec = this.toVec(this.friction);
    }

    setGearRatios(gearRatios: {[key: string]: number}) {
        this.gearRatios = gearRatios;
    }

    setGear(gear: number) {
        this.gearRatioVec = this.toVec(this.gearRatios[gear]);
    }

    getVelocity(velocity: Vector2, direction: Vector2, deltaTime: number): Vector2 {
        this.velocityVec = velocity;
        this.directionVec = direction;

        const acceleration = this.getForce().divide(this.massVec);
        const timeVec = new Vector2(deltaTime, deltaTime);

        return velocity.add(acceleration.multiply(timeVec));
    }
    
    private getForce(): Vector2 {
        const forwardForce = this.getForwardForce();
        const dragForce = this.getFriction();

        return forwardForce.add(dragForce);
    }

    private getFriction(): Vector2 {
        return this.velocityVec.multiply(this.frictionVec).negate();
    }

    private getForwardForce(): Vector2 {
        return this.directionVec.multiply(this.torqueVec).multiply(this.gearRatioVec).divide(this.wheelRadiusVec);
    }

    private toVec(num: number) {
        return new Vector2(num, num);
    }
}