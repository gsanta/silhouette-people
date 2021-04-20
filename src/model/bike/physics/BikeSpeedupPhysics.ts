import { Vector2 } from 'babylonjs';
import regression from 'regression';
import { BikeObj } from '../../general/objs/CharacterObj';
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
    private currentGear = 0;
    private readonly bike: BikeObj;

    constructor(bike: BikeObj) {
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
        this.bike.walker.setGear(gear);
        this.initGear();
    }

    update(deltaTime: number) {
        const [ gear, speed ] = [this.bike.walker.getGear(), this.bike.walker.getSpeed()];

        if (speed === 0 || gear !== this.currentGear) {
            this.initGear();
        }

        this.currTime = this.currTime + deltaTime / 1000;
        
        let newSpeed: number;

        if (this.currTime > this.maxTime) {
            newSpeed = speed;
        } else {
            newSpeed = this.equations[gear].predict(this.currTime)[1];
        }

        this.bike.walker.setSpeed(newSpeed);
    }

    private resetTimers() {
        this.startTime = 0;
        this.currTime = 0;
        this.maxTime = 0;
    }

    private initGear() {
        const gear = this.bike.walker.getGear();
        const speed = this.bike.walker.getSpeed();
        this.resetTimers();

        const [min, max] = [this.speedLimits[gear][0], this.speedLimits[gear][1]];
        const minTime = this.speedRanges[gear][0].x;
        const maxTime = this.speedRanges[gear][1].x;

        const ratio = (speed - min) / (max - min);
        this.startTime = minTime + ratio * 3;
        this.currTime = this.startTime;
        this.maxTime = maxTime;
        this.currentGear = gear;
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