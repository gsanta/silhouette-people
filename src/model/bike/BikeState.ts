import { Bike } from "../general/objs/MeshObj";
import { MeshState } from "../general/state/MeshState";

export type PedalDirection = 'forward' | 'backward';

export abstract class BikeState extends MeshState<Bike> {

    readonly rotationConst = Math.PI / 30;

    protected _isBraking = false
    protected _isPedalling = false;
    protected pedalDirection: PedalDirection = 'forward'; 
    protected speed: number = 0;
    protected gear: number = 0;
    protected rotation: number = 0;

    constructor(bike: Bike) {
        super(bike);
    }

    setBraking(isBraking: boolean): BikeState {
        if (this._isBraking !== isBraking) {
            this._isDirty = true;
            this._isBraking = isBraking;
        }

        return this;
    }

    isBraking(): boolean {
        return this._isBraking;
    }

    setPedalling(isPedalling: boolean): BikeState {
        if (this._isPedalling !== isPedalling) {
            this._isDirty = true;
            this._isPedalling = isPedalling;
        }

        return this;
    }

    isPedalling(): boolean {
        return this._isPedalling;
    }

    setPedalDirection(direction: PedalDirection): BikeState {
        if (this.pedalDirection !== direction) {
            this._isDirty = true;
            this.pedalDirection = direction;
        }

        return this;
    }

    getPedalDirection(): PedalDirection {
        return this.pedalDirection;
    }

    getSpeed() {
        return this.speed;
    }
    
    setGear(gear: number) {
        if (gear !== this.gear) {
            this.gear = gear;
            this._isDirty = true;
        }
    }

    getGear() {
        return this.gear;
    }

    setRotation(rotation: number) {
        if (this.rotation !== rotation) {
            this.rotation = rotation;
            this._isDirty = true;
        }
    }

    getRotation(): number {
        return this.rotation;
    }

    setSpeed(speed: number) {
        if (this.speed !== speed) {
            this.speed = speed;
            this._isDirty = true;
        }
    }

    copyTo(otherState: BikeState): BikeState {
        otherState._isBraking = this._isBraking;
        otherState._isPedalling = this._isPedalling;
        otherState.pedalDirection = this.pedalDirection;
        otherState._isDirty = this._isDirty;
        otherState.gear = this.gear;
        otherState.speed = this.speed;
        return otherState;
    }
}