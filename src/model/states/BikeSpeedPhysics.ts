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
        const deltaTimeInSec = deltaTime / 1000;
        const speedRange = this.speedRanges[0];
        
        let acc: number;

        if (currentSpeed < speedRange[0] || currentSpeed > speedRange[1]) {
            acc = 0;
        } else {
            acc =  -this.equations[0].predict(currentSpeed)[1];
            // acc = Math.sqrt(Math.sqrt(acc));
        }

        console.log('acc: ' + acc + ' speed: ' + currentSpeed);

        return currentSpeed + acc * deltaTimeInSec / 2;
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