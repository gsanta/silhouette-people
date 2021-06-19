import { Vector3 } from "babylonjs";
import { rotateVec, vector3ToRotation } from "../../../../../helpers";
import { MotionController } from "../../MotionController";
import { GameObject } from "../../GameObject";

export type PedalDirection = 'forward' | 'backward';

export class BikeController extends MotionController {
    readonly rotationConst = Math.PI / 60;
    private _isPedalling = false;
    private _isBraking = false;
    private _gear: number = 0;
    private _isPowerBrakeOn = false;
    private _maxGear: number = 2;

    private bike: GameObject;

    constructor(bike: GameObject) {
        super(bike);

        this.bike = bike;
    }

    get isPedalling() {
        return this._isPedalling;
    }

    set pedalling(isPedalling: boolean) {
        this._isPedalling = isPedalling;
    }

    get isBraking() {
        return this._isBraking;
    }

    set braking(isBraking: boolean) {
        this._isBraking = isBraking;
    }

    get gear() {
        return this._gear;
    }

    set gear(gear: number) {
        this._gear = gear;
    }

    get isPowerBrakeOn() {
        return this._isPowerBrakeOn;
    }

    set powerBrakeOn(isPowerBrakeOn: boolean) {
        this._isPowerBrakeOn = isPowerBrakeOn;
    }
    
    get maxGear(): number {
        return this._maxGear;
    }

    update(deltaTime: number) {
        const character = this.character.children[0];
        if (character.routeController && !character.routeController.isRunning()) {
            return;
        }

        this.bike.stateController.state.update(deltaTime);

        if (this.speed > 0) {
            this.direction = this.updateDirection(deltaTime);
            const deltaTimeSec = deltaTime / 1000;
            const displacement = this.speed * deltaTimeSec;
            const displacementVec = new Vector3(displacement, displacement, displacement);
            let vel = this.direction.multiply(displacementVec);
    
            this.character.moveWithCollision(vel);
            this.character.rotation = vector3ToRotation(vel);
        }
        
    }
}