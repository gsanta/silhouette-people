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

describe('TwoPoints', () => {

    it ('horizontal line', () => {

        const lineEq = LineEquation.TwoPoints(new Vector2(2, 3), new Vector2(5, 3));
        expect(lineEq.isHorizontal()).toBeTruthy();
        expect(lineEq.c).toBeCloseTo(3);
    });

    it ('vertical line', () => {

        const lineEq = LineEquation.TwoPoints(new Vector2(2, 3), new Vector2(2, 5));
        expect(lineEq.isVertical()).toBeTruthy();
        expect(lineEq.xIntercept).toBeCloseTo(2);
    });

    it ('45 deg line', () => {

        const lineEq = LineEquation.TwoPoints(new Vector2(2, 3), new Vector2(4, 5));
        expect(lineEq.m).toBeCloseTo(1);
        expect(lineEq.getY(2)).toBeCloseTo(3);
    });
});

describe('getPerpendicularLine', () => {

    it ('horziontal line', () => {
        const line = new LineEquation(0, 3);
        const perpLine = line.getPerpendicularLine(new Vector2(4, 3));

        expect(perpLine.m).toEqual(Infinity);
        expect(perpLine.c).toBeUndefined();
        expect(perpLine.xIntercept).toBeCloseTo(4);
    });

    it ('vertical line', () => {
        const line = LineEquation.Vertical(2);
        const perpLine = line.getPerpendicularLine(new Vector2(2, 4));

        expect(perpLine.isHorizontal()).toBeTruthy();
        expect(perpLine.c).toBeCloseTo(4);
    });

    it ('45 deg line', () => {
        const line = new LineEquation(1, 3);
        const perpLine = line.getPerpendicularLine(new Vector2(2, 5));

        expect(perpLine.m).toBeCloseTo(-1);
        expect(perpLine.c).toBeCloseTo(7);
    });

    it ('neg 45 deg line', () => {
        const line = new LineEquation(-1, 3);
        const perpLine = line.getPerpendicularLine(new Vector2(2, 1));

        expect(perpLine.m).toBeCloseTo(1);
        expect(perpLine.c).toBeCloseTo(-1);
    });
});