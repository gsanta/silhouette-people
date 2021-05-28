import { Tools, Vector3 } from 'babylonjs';
import { rotToVec, solveTangent } from '../src/helpers';


describe('Converting angle to direction vector', () => {
    it ('handles 0 deg', () => {
        const vector = rotToVec(0);
        expect(vector.x).toBe(0);
        expect(vector.y).toBe(0);
        expect(vector.z).toBe(1);
    });
    
    it ('handles 90 deg', () => {
        const vector = rotToVec(Tools.ToRadians(90));
        expect(vector.x).toBeCloseTo(1);
        expect(vector.y).toBeCloseTo(0);
        expect(vector.z).toBeCloseTo(0);
    });

    it ('handles -90 deg', () => {
        const vector = rotToVec(Tools.ToRadians(-90));
        expect(vector.x).toBeCloseTo(-1);
        expect(vector.y).toBeCloseTo(0);
        expect(vector.z).toBeCloseTo(0);
    });

    it ('handles 45 deg', () => {
        const vector = rotToVec(Tools.ToRadians(45));
        expect(vector.x).toBeCloseTo(0.707);
        expect(vector.y).toBeCloseTo(0);
        expect(vector.z).toBeCloseTo(0.707);
    });
});

describe('solveTangent', () => {
    it ('solves when tangent is horizontal', () => {
        const p = new Vector3(-5, 0, 0);
        const circleCenter = new Vector3(0, 0, 2);
        const radius = 2;

        const result = solveTangent(p, circleCenter, radius);

        expect(result.x).toBeCloseTo(0);
        expect(result.z).toBeCloseTo(0);
    });

    it ('solves when tangent is horizontal', () => {
        const p = new Vector3(-10, 0, 0);
        const circleCenter = new Vector3(0, 0, 0);
        const radius = 5;

        const result = solveTangent(p, circleCenter, radius);
        console.log(result);
        expect(result.x).toBeCloseTo(0);
        expect(result.z).toBeCloseTo(5.77);
    });
});