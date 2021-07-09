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

describe('Line bisector', () => {
    it ('bisector for vertical line', () => {
        const line = new Line(new Vector2(1, 1), new Vector2(1, 9));

        const bisector = line.getBisector(10);
        expect(bisector.p1.x).toBeCloseTo(-4);
        expect(bisector.p1.y).toBeCloseTo(5);
        expect(bisector.p2.x).toBeCloseTo(6);
        expect(bisector.p2.y).toBeCloseTo(5);
    });

    it ('bisector for horizontal line', () => {
        const line = new Line(new Vector2(1, 1), new Vector2(9, 1));

        const bisector = line.getBisector(10);
        expect(bisector.p1.x).toBeCloseTo(5);
        expect(bisector.p1.y).toBeCloseTo(6);
        expect(bisector.p2.x).toBeCloseTo(5);
        expect(bisector.p2.y).toBeCloseTo(-4);
    });

    it ('bisector for 45 deg', () => {
        const line = new Line(new Vector2(1, 1), new Vector2(10, 10));

        const bisector = line.getBisector(10);
        expect(bisector.p1.x).toBeCloseTo(1.964);
        expect(bisector.p1.y).toBeCloseTo(9.035);
        expect(bisector.p2.x).toBeCloseTo(9.035);
        expect(bisector.p2.y).toBeCloseTo(1.964);
    });
});

describe('Angle between two vectors', () => {
    it ('90 deg angle', () => {
        const line1 = new Line(new Vector2(0, 0), new Vector2(0, 5));
        const line2 = new Line(new Vector2(0, 0), new Vector2(5, 0));
        const angle = line1.angleBetween(line2);
        expect(Tools.ToDegrees(angle)).toBeCloseTo(90);
    });

    it ('37 deg angle', () => {
        const line1 = new Line(new Vector2(0, 0), new Vector2(1, 2));
        const line2 = new Line(new Vector2(0, 0), new Vector2(2, 1));
        const angle = line1.angleBetween(line2);
        expect(Tools.ToDegrees(angle)).toBeCloseTo(36.869);
    });
});