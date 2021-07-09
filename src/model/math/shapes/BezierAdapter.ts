import { Vector3 } from 'babylonjs';
const Bezier = require('bezier-js');

export class BezierAdatper {

    private readonly bezier: any;
    private readonly y: number;

    constructor(controlPoints: Vector3[]) {
        this.y = controlPoints[0].y;
        const points = controlPoints.map(cp => [cp.x, cp.z]).flat();

        this.bezier = new Bezier.Bezier(points);
    }

    get points(): Vector3[] {
        const points: Vector3[] = [];

        for (let i = 0; i <= 10; i++) {
            const p = this.bezier.get(i / 10);
            points.push(new Vector3(p.x, this.y, p.y));
        }

        return points;
    }

    get size(): number {
        return this.bezier.length();
    }

    getT(t: number): Vector3 {
        const p = this.bezier.get(t);
        return new Vector3(p.x, this.y, p.y);
    }

    getDerivative(t: number): Vector3 {
        const p = this.bezier.derivative(t);
        return new Vector3(p.x, this.y, p.y);
    }
}