import { Vector2 } from 'babylonjs';
import regression from 'regression';

export interface BikeSpeedPhysicsConf {
    maxAcceleration: number;
    gearSpeedRanges: [Vector2, Vector2][];
}

type BikePhysicsState = 'accelerating' | 'breaking' | 'rolling' | 'reverse' | 'idle';

export enum BikeSpeedState {
    Accelerating = 'Accelerating',
    Braking = 'Braking',
    Rolling = 'Rolling',
    Reverse = 'Reverse',
    Idle = 'Idle'
}

export class BikeSpeedPhysics {
    private maxAcc: number;
    private speedRanges: [Vector2, Vector2][];
    private equations: regression.Result[] = [];
    private speedLimits: [number, number][] = [];
    private gear = 1;
    private bikeState: BikeSpeedState = BikeSpeedState.Idle;
    private startTime = 0;
    private currTime = 0;
    private maxTime = 0;

    constructor(config: BikeSpeedPhysicsConf) {
        this.maxAcc = config.maxAcceleration;
        this.speedRanges = config.gearSpeedRanges;
        this.setup();
    }

    setGear(gear: number) {
        this.gear = gear;
    }

    accelerate(currentSpeed: number, deltaTime: number) {
        if (this.bikeState !== BikeSpeedState.Accelerating) {
            this.startAccelerating(currentSpeed);
        }

        this.currTime = this.currTime + deltaTime / 1000;

        if (this.currTime > this.maxTime) {
            return currentSpeed;
        } else {
            return this.equations[this.gear].predict(this.currTime)[1];
        }
    }

    brake() {
        this.resetTimers();
        this.bikeState = BikeSpeedState.Idle;

        return 0;
    }

    roll() {

    }

    reverse() {
        this.bikeState = BikeSpeedState.Reverse;
        return -0.04;
    }

    private resetTimers() {
        this.startTime = 0;
        this.currTime = 0;
        this.maxTime = 0;
    }

    private startAccelerating(currentSpeed: number) {
        this.resetTimers();

        this.bikeState = BikeSpeedState.Accelerating;
        if (currentSpeed < this.speedLimits[this.gear][0]) {
            return 0;
        } else if (currentSpeed > this.speedLimits[this.gear][1]) {
            return this.speedLimits[this.gear][1];
        } else {
            const [min, max] = [this.speedLimits[this.gear][0], this.speedLimits[this.gear][1]];
            const minTime = this.speedRanges[this.gear][0].x;
            const maxTime = this.speedRanges[this.gear][1].x;

            const ratio = (currentSpeed - min) / (max - min);
            this.startTime = minTime + ratio * 3;
            this.currTime = this.startTime;
            this.maxTime = maxTime;
        }
    }

    private setup() {
        this.speedLimits = this.speedRanges.map(range => [range[0].y, range[1].y]);

        this.equations = this.speedRanges.map(range => {
            const p1: [number, number] = [range[0].x, range[0].y];
            const p2: [number, number] = [range[1].x, range[1].y];

            return regression.linear([p1, p2], { precision: 2 });
        });
    }
}