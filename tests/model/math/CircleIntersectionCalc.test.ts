import { Vector2 } from "babylonjs";
import { CircleIntersectionCalc } from "../../../src/model/math/CircleIntersectionCalc";
import { LineEquation } from "../../../src/model/math/LineEquation";
import { Circle } from "../../../src/model/math/shapes/Circle";

describe('getIntersectionPoints', () => {
    it ('two intersection points, vertical line, circle in the origo', () => {
        const circle = new Circle(new Vector2(0, 0), 2);
        const line = LineEquation.Vertical(1);

        const calc = new CircleIntersectionCalc(circle);
        const [p1, p2] = calc.getIntersectionPoints(line);

        expect(p1.y).toBeCloseTo(1.732);
        expect(p1.x).toBe(1);
        expect(p2.y).toBeCloseTo(-1.732);
        expect(p2.x).toBe(1);
    });

    it ('two intersection points, vertical line, circle not in the origo', () => {
        const circle = new Circle(new Vector2(2, 1), 2);
        const line = LineEquation.Vertical(2);

        const calc = new CircleIntersectionCalc(circle);
        const [p1, p2] = calc.getIntersectionPoints(line);

        expect(p1.y).toBe(3);
        expect(p1.x).toBe(2);
        expect(p2.y).toBe(-1);
        expect(p2.x).toBe(2);
    });

    it ('two intersection points, horizontal line', () => {
        const circle = new Circle(new Vector2(-2, 3), 3);
        const line = new LineEquation(0, 3, undefined);

        const calc = new CircleIntersectionCalc(circle);
        const [p1, p2] = calc.getIntersectionPoints(line);

        expect(p1.y).toBe(3);
        expect(p1.x).toBe(1);
        expect(p2.y).toBe(3);
        expect(p2.x).toBe(-5);
    });

    it ('two intersection points, line with positive m', () => {
        const circle = new Circle(new Vector2(3, 2), 2);
        const line = new LineEquation(1, -1, undefined);

        const calc = new CircleIntersectionCalc(circle);
        const [p1, p2] = calc.getIntersectionPoints(line);

        expect(p1.x).toBeCloseTo(4.414);
        expect(p1.y).toBeCloseTo(3.414);
        expect(p2.x).toBeCloseTo(1.585);
        expect(p2.y).toBeCloseTo(0.585);
    });

    it ('two intersection points, line with negative m', () => {
        const circle = new Circle(new Vector2(2, 1), 1);
        const line = new LineEquation(-0.5, 2, undefined);

        const calc = new CircleIntersectionCalc(circle);
        const [p1, p2] = calc.getIntersectionPoints(line);

        expect(p1.x).toBeCloseTo(2.894);
        expect(p1.y).toBeCloseTo(0.552);
        expect(p2.x).toBeCloseTo(1.105);
        expect(p2.y).toBeCloseTo(1.447);
    });

    it ('one intersection point, general line', () => {
        const circle = new Circle(new Vector2(2, 1), 1);
        const line = new LineEquation(0, 2, undefined);

        const calc = new CircleIntersectionCalc(circle);
        const [p1, p2] = calc.getIntersectionPoints(line);

        expect(p1.x).toBe(2);
        expect(p1.y).toBe(2);
        expect(p2).toBeFalsy();
    });

    it ('one intersection point, vertical line', () => {
        const circle = new Circle(new Vector2(1, 3), 2);
        const line = LineEquation.Vertical(3);

        const calc = new CircleIntersectionCalc(circle);
        const [p1, p2] = calc.getIntersectionPoints(line);

        expect(p1.x).toBe(3);
        expect(p1.y).toBe(3);
        expect(p2.x).toBe(3);
        expect(p2.y).toBe(3);
    });

    it ('no intersection, horizontal line', () => {
        const circle = new Circle(new Vector2(0, 0), 2);
        const line = new LineEquation(0, 3, undefined);

        const calc = new CircleIntersectionCalc(circle);
        const [p1, p2] = calc.getIntersectionPoints(line);

        expect(p1).toBeFalsy();
        expect(p2).toBeFalsy();
    });

    it ('no intersection, vertical line', () => {
        const circle = new Circle(new Vector2(0, 0), 2);
        const line = LineEquation.Vertical(3);

        const calc = new CircleIntersectionCalc(circle);
        const [p1, p2] = calc.getIntersectionPoints(line);

        expect(p1).toBeFalsy();
        expect(p2).toBeFalsy();
    });

    it ('no intersection, general line', () => {
        const circle = new Circle(new Vector2(0, 0), 2);
        const line = new LineEquation(0.5, 5, undefined);

        const calc = new CircleIntersectionCalc(circle);
        const [p1, p2] = calc.getIntersectionPoints(line);

        expect(p1).toBeFalsy();
        expect(p2).toBeFalsy();
    });
});