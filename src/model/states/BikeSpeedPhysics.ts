import { Vector2 } from 'babylonjs';
import regression from 'regression';

export interface BikeSpeedPhysicsConf {
    maxAcceleration: number;
    gearSpeedRanges: [Vector2, Vector2][];
}

export class BikeSpeedPhysics {
    private maxAcc: number;
    private speedRanges: [Vector2, Vector2][];
    private equations: regression.Result[] = [];
    private speedLimits: [number, number][] = [];
    private gear = 0;
    private accelerating = false;
    private startTime = 0;
    private currTime = 0;
    private maxTime = 0;

    constructor(config: BikeSpeedPhysicsConf) {
        this.maxAcc = config.maxAcceleration;
        this.speedRanges = config.gearSpeedRanges;
        this.setup();
    }

    reset() {
        this.startTime = 0;
        this.currTime = 0;
        this.maxTime = 0;
        this.accelerating = false;
    }

    getSpeed(currentSpeed: number, deltaTime: number) {
        const deltaTimeInSec = deltaTime / 1000;
        const speedRange = this.speedRanges[0];

        if (!this.accelerating) {
            this.startAccelerating(currentSpeed);
        }

        this.currTime = this.currTime + deltaTime / 1000;

        if (this.currTime > this.maxTime) {
            return currentSpeed;
        } else {
            return this.equations[this.gear].predict(this.currTime)[1];
        }

        // if (currentSpeed < this.speedLimits[this.gear][0]) {
        //     return 0;
        // } else if (currentSpeed > this.speedLimits[this.gear][1]) {
        //     return this.speedLimits[this.gear][1];
        // } else {

        // }

        // let acc: number;

        // if (currentSpeed < speedRange[0] || currentSpeed > speedRange[1]) {
        //     acc = 0;
        // } else {
        //     acc =  -this.equations[0].predict(currentSpeed)[1];
        //     // acc = Math.sqrt(Math.sqrt(acc));
        // }

        // console.log('acc: ' + acc + ' speed: ' + currentSpeed);

        // return currentSpeed + acc * deltaTimeInSec / 2;
    }

    private startAccelerating(currentSpeed: number) {
        this.accelerating = true;
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