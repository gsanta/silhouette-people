import { Tools } from 'babylonjs';
import { rotToVec } from '../src/helpers';


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
        console.log(vector);
        expect(vector.x).toBeCloseTo(0.707);
        expect(vector.y).toBeCloseTo(0);
        expect(vector.z).toBeCloseTo(0.707);
    });
});