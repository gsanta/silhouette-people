import { MeshObj } from "../objs/MeshObj";

export type PedalDirection = 'forward' | 'backward';

export abstract class BikeState {
    protected bike: MeshObj;

    protected _isBraking = false
    protected _isPedalling = false;
    protected pedalDirection: PedalDirection = 'forward'; 
    protected speed: number = 0;
    protected gear: number = 0;
    protected rotation: number = 0;

    private _isDirty = false;

    constructor(bike: MeshObj) {
        this.bike = bike;
    }

    setBraking(isBraking: boolean): BikeState {
        this._isBraking = isBraking;

        return this;
    }

    isBraking(): boolean {
        return this._isBraking;
    }

    setPedalling(isPedalling: boolean): BikeState {
        this._isPedalling = isPedalling;

        return this;
    }

    isPedalling(): boolean {
        return this._isPedalling;
    }

    setPedalDirection(direction: PedalDirection): BikeState {
        this.pedalDirection = direction;

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

    isDirty() {
        return this._isDirty;
    }

    clearDirty() {
        this._isDirty = false;
    }

    protected setSpeed(deltaTime: number) {
        const deltaTimeSec = deltaTime / 1000;
        this.speed = this.speed * deltaTimeSec;
    }

    exitState() {
        this.bike.stopCurrentAnimation();
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