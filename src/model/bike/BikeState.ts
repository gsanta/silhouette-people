
export type PedalDirection = 'forward' | 'backward';

export abstract class BikeState {
    protected _isBraking = false
    protected _isPedalling = false;
    protected pedalDirection: PedalDirection = 'forward'; 

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

    copyTo(otherState: BikeState): BikeState {
        otherState.setBraking(this.isBraking());
        otherState.setPedalling(this.isPedalling());
        otherState.setPedalDirection(this.getPedalDirection());
        return otherState;
    }
}