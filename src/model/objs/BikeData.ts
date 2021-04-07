

export class BikeData {
    private speed: number = 0;
    private gear: number = 0;
    private _isDirty = false;

    setSpeed(speed: number) {
        if (this.speed !== speed) {
            this.speed = speed;
            this._isDirty = true;
        }
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

    isDirty() {
        return this._isDirty;
    }

    clearDirty() {
        this._isDirty = false;
    }
}