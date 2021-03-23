import { Vector2 } from "babylonjs";
import { GameObj } from "../objs/GameObj";


export class DrivingCharacterState {
    private torque = new Vector2(1, 1);
    private dragConst = new Vector2(0.2, 0.2);
    private massVector = new Vector2(10, 10);
    private mass = 10;
    private velocity: Vector2 = new Vector2(0, 0);
    private wheelRadius = 0.3;
    private gearRatio = 1;

    private gearRatioVec: Vector2;
    private wheelRadiusVec: Vector2;
    private rpm = 60;

    private gameObj: GameObj;

    constructor(gameObj: GameObj) {
        this.gameObj = gameObj;

        this.gearRatioVec = this.toVec(this.gearRatio);
        this.wheelRadiusVec = this.toVec(this.wheelRadius);
    }

    getVelocity(velocity: Vector2, deltaTime: number): Vector2 {
        this.velocity = velocity;
        const acceleration = this.getForce().divide(this.massVector);
        const timeVec = new Vector2(deltaTime, deltaTime);

        return velocity.add(acceleration.multiply(timeVec));
    }

    private getForce(): Vector2 {
        const tractiveForce = this.getForwardForce();
        const dragForce = this.getDragForce();

        return tractiveForce.add(dragForce);
    }

    private getDragForce(): Vector2 {
        const speed = this.velocity.length();
        const speedVec = new Vector2(speed, speed);
        return this.velocity.multiply(this.dragConst).multiply(speedVec).negate();
    }

    private getForwardForce(): Vector2 {
        return this.gameObj.getFrontDirection2D().multiply(this.torque).multiply(this.gearRatioVec).divide(this.wheelRadiusVec);
    }

    private toVec(num: number) {
        return new Vector2(num, num);
    }
}