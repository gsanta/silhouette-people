import { Tools, Vector2 } from "babylonjs";
import { Line } from "../../../src/model/math/shapes/Line";


describe('Line angle', () => {

    it ('angle in first quadrant', () => {
        const line = new Line(new Vector2(2, 2), new Vector2(5, 5));

        expect(Tools.ToDegrees(line.angle.rad)).toBe(45);
    });

    it ('angle in second quadrant', () => {
        const line = new Line(new Vector2(2, 2), new Vector2(-2, 6));

        expect(Tools.ToDegrees(line.angle.rad)).toBe(135);
    });

    it ('angle in third quadrant', () => {
        const line = new Line(new Vector2(0, 0), new Vector2(-2, -1));

        expect(Math.round(Tools.ToDegrees(line.angle.rad))).toBe(207);
    });

    it ('angle in fourth quadrant', () => {
        const line = new Line(new Vector2(0, 0), new Vector2(2, -2));

        expect(Tools.ToDegrees(line.angle.rad)).toBe(315);
    });

    it ('angle 0', () => {
        const line = new Line(new Vector2(0, 0), new Vector2(2, 0));

        expect(Tools.ToDegrees(line.angle.rad)).toBe(0);
    });
});

describe('getMinDistance', () => {

    describe('vertical line', () => {
        
        it ('point above line', () => {
            const line = new Line(new Vector2(1, 1), new Vector2(1, 8));
            const e = new Vector2(1, 10);
            
            expect(line.getMinDistance(e)).toBeCloseTo(2);
        });

        it ('point below line', () => {
            const line = new Line(new Vector2(1, 1), new Vector2(1, 8));
            const e = new Vector2(1, -1);
            
            expect(line.getMinDistance(e)).toBeCloseTo(2);
        });

        it ('point is within endpoints', () => {
            const line = new Line(new Vector2(1, 1), new Vector2(1, 8));
            const e = new Vector2(5, 4);
            
            expect(line.getMinDistance(e)).toBeCloseTo(4);
        });
    });

    describe('horizontal line', () => {
        it ('point left of line', () => {
            const line = new Line(new Vector2(1, 1), new Vector2(8, 1));
            const e = new Vector2(-1, 1);
            
            expect(line.getMinDistance(e)).toBeCloseTo(2);
        });

        it ('point right of line', () => {
            const line = new Line(new Vector2(1, 1), new Vector2(8, 1));
            const e = new Vector2(10, 1);
            
            expect(line.getMinDistance(e)).toBeCloseTo(2);
        });

        it ('point is within endpoints', () => {
            const line = new Line(new Vector2(1, 1), new Vector2(8, 1));
            const e = new Vector2(5, 4);
            
            expect(line.getMinDistance(e)).toBeCloseTo(3);
        });
    });

    describe('general line', () => {
        it ('point right of line', () => {
            const line = new Line(new Vector2(1, 1), new Vector2(5, 5));
            const e = new Vector2(6, 6);
            
            expect(line.getMinDistance(e)).toBeCloseTo(Math.SQRT2);
        });

        it ('point right of line', () => {
            const line = new Line(new Vector2(1, 1), new Vector2(5, 5));
            const e = new Vector2(0, 0);
            
            expect(line.getMinDistance(e)).toBeCloseTo(Math.SQRT2);
        });

        it ('point is within endpoints', () => {
            const line = new Line(new Vector2(1, 1), new Vector2(5, 5));
            const e = new Vector2(4, 3);
            
            expect(line.getMinDistance(e)).toBeCloseTo(0.707);
        });
    });
});