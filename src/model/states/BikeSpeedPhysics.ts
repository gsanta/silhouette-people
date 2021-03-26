import regression from 'regression';

export interface BikeSpeedPhysicsConf {
    maxAcceleration: number;
    gearSpeedRanges: [number, number][];
}

export class BikeSpeedPhysics {
    private maxAcc: number;
    private speedRanges: [number, number][];
    private equations: regression.Result[] = [];


    constructor(config: BikeSpeedPhysicsConf) {
        this.maxAcc = config.maxAcceleration;
        this.speedRanges = config.gearSpeedRanges;
        this.setup();
    }

    getSpeed(currentSpeed: number, deltaTime: number) {
        const [p, acc] = this.equations[0].predict(currentSpeed);

        return currentSpeed + acc * deltaTime / 2;
    }

    private setup() {
        this.equations = this.speedRanges.map(range => {
            const p1: [number, number] = [range[0], 0];
            const p2: [number, number] = [(range[0] + range[1] - range[0]) / 2, -this.maxAcc];
            const p3: [number, number] = [range[1], 0];

            return regression.polynomial([p1, p2, p3], { precision: 2 });
        });
    }
}