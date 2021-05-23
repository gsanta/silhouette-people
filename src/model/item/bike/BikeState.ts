import { MeshState } from "../mesh/MeshState";

export class BikeStateInfo {
    private _isPedalling: boolean = false;
    private _isBraking: boolean = false;
    private _gear: number = 0;
    private _isPowerBrakeOn: boolean = false;
    private _steering: number = 0;
    private _maxGear: number = 2;

    get isPedalling() {
        return this._isPedalling;
    }

    setPedalling(isPedalling: boolean): BikeStateInfo {
        if (this._isPedalling !== isPedalling) {
            const clone = this.clone();
            clone._isPedalling = isPedalling;
            return clone;
        }

        return this;
    }

    get isBraking() {
        return this._isBraking;
    }

    setBraking(isBraking: boolean): BikeStateInfo {
        if (this._isBraking !== isBraking) {
            const clone = this.clone();
            clone._isBraking = isBraking;
            return clone;
        }

        return this;
    }

    get gear() {
        return this._gear;
    }

    setGear(gear: number): BikeStateInfo {
        if (this._gear !== gear) {
            const clone = this.clone();
            clone._gear = gear;
            return clone;
        }

        return this;
    }

    get isPowerBrakeOn() {
        return this._isPowerBrakeOn;
    }

    setPowerBrakeOn(isPowerBrakeOn: boolean): BikeStateInfo {
        if (this._isPowerBrakeOn !== isPowerBrakeOn) {
            const clone = this.clone();
            clone._isPowerBrakeOn = isPowerBrakeOn;
            return clone;
        }

        return this;
    }
    
    get steering() {
        return this._steering;
    }

    setSteering(steering: number): BikeStateInfo {
        if (this._steering !== steering) {
            const clone = this.clone();
            clone._steering = steering;
            return clone;
        }

        return this;
    }

    get maxGear() {
        return this._maxGear;
    }

    private clone() {
        const info = new BikeStateInfo();
        info._isPedalling = this._isPedalling;
        info._isBraking = this._isBraking;
        info._gear = this._gear;
        info._isPowerBrakeOn = this._isPowerBrakeOn;
        return info;
    }
}

export abstract class BikeState extends MeshState {
    abstract updateInfo(bikeStateInfo: BikeStateInfo): void;
}