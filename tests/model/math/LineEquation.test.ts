import { Vector2 } from "babylonjs";
import { LineEquation } from "../../../src/model/math/LineEquation";


describe('angle', () => {
    it ('horizontal line', () => {
        const lineEq = new LineEquation(0, 3);

        expect(lineEq.angle).toBeCloseTo(0);
    });

    it ('vertical line', () => {
        const lineEq = LineEquation.Vertical(1);

        expect(lineEq.angle).toBeCloseTo(Math.PI / 2);
    });

    it ('45 deg line', () => {
        const lineEq = new LineEquation(1, 3);

        expect(lineEq.angle).toBeCloseTo(Math.PI / 4);
    });

    it ('-45 deg line', () => {
        const lineEq = new LineEquation(-1, 3);

        expect(lineEq.angle).toBeCloseTo(-Math.PI / 4);
    });
});

describe('PointSlope', () => {

    it ('horizontal line', () => {

        const lineEq = LineEquation.PointSlope(new Vector2(2, 3), 0);
        expect(lineEq.isHorizontal()).toBeTruthy();
        expect(lineEq.c).toBeCloseTo(3);
    });

    it ('vertical line', () => {

        const lineEq = LineEquation.PointSlope(new Vector2(2, 3), -Infinity);
        expect(lineEq.isVertical()).toBeTruthy();
        expect(lineEq.xIntercept).toBeCloseTo(2);
    });

    it ('45 deg line', () => {

        const lineEq = LineEquation.PointSlope(new Vector2(2, 3), -1);
        expect(lineEq.m).toBeCloseTo(-1);
        expect(lineEq.getY(2)).toBeCloseTo(3);
    });
});