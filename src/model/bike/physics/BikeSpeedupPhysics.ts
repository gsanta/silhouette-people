import { Vector2 } from 'babylonjs';
import regression from 'regression';
import { Bike } from '../../objs/MeshObj';
import { IBikePhysics } from './IBikePhysics';

export interface BikeSpeedPhysicsConf {
    gearSpeedRanges: [Vector2, Vector2][];
}

export enum BikeSpeedState {
    Accelerating = 'Accelerating',
    Braking = 'Braking',
    Rolling = 'Rolling',
    Reverse = 'Reverse',
    Idle = 'Idle'
}

export class BikeSpeedupPhysics implements IBikePhysics {
    private speedRanges: [Vector2, Vector2][];
    private equations: regression.Result[] = [];
    private speedLimits: [number, number][] = [];
    private startTime = 0;
    private currTime = 0;
    private maxTime = 0;
    private readonly bike: Bike;

    constructor(bike: Bike) {
        this.speedRanges = [
            [ new Vector2(-1.6, -10 / 3.6), new Vector2(1.4, 2.5) ],
            [ new Vector2(-0.1, 0), new Vector2(2, 5) ],
            [ new Vector2(1.4, 10 / 3.6), new Vector2(4.4, 7.5) ]
        ];
    
        this.bike = bike;
        this.setup();
        this.initGear();
    }

    setGear(gear: number) {
        const speed = this.bike.state.getSpeed();
        this.bike.state.setGear(gear);
        this.initGear();
    }

    update(deltaTime: number) {
        const [ gear, speed ] = [this.bike.state.getGear(), this.bike.state.getSpeed()];

        if (speed === 0) {
            this.initGear();
        }

        this.currTime = this.currTime + deltaTime / 1000;
        
        let newSpeed: number;

        if (this.currTime > this.maxTime) {
            newSpeed = speed;
        } else {
            newSpeed = this.equations[gear].predict(this.currTime)[1];
        }

        this.bike.state.setSpeed(newSpeed);
    }

    private resetTimers() {
        this.startTime = 0;
        this.currTime = 0;
        this.maxTime = 0;
    }

    private initGear() {
        const gear = this.bike.state.getGear();
        const speed = this.bike.state.getSpeed();
        this.resetTimers();

        const [min, max] = [this.speedLimits[gear][0], this.speedLimits[gear][1]];
        const minTime = this.speedRanges[gear][0].x;
        const maxTime = this.speedRanges[gear][1].x;

        const ratio = (speed - min) / (max - min);
        this.startTime = minTime + ratio * 3;
        this.currTime = this.startTime;
        this.maxTime = maxTime;
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