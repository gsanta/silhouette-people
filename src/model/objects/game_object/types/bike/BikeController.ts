import { Vector3 } from "babylonjs";
import { toVector2, vector3ToRotation } from "../../../../../helpers";
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
        const edge = this.character.routeController.getEdge();
        const route = this.character.routeController.getRoute();
        const reversed = route.isReversed(edge);

        if (edge && this.speed > 0) {
            const displacement = this.speed * (deltaTime / 1000);
            let displacementRatio = displacement / edge.shape.size;
            
            if (reversed) {
                displacementRatio = -displacementRatio;
            }

            const t = this.character.routeController.getT() + displacementRatio;

            this.character.routeController.setT(t);

            const pos = edge.shape.getT(t);
            const currPos = this.character.position;

            const diff = pos.subtract(currPos);
            diff.y = 0;
            this.character.moveWithCollision(diff);
            const tangent = edge.shape.getDerivative(t, reversed);
            this.character.rotationY = vector3ToRotation(tangent);
        }
    }
}