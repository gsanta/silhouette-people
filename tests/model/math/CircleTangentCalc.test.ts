import { Vector2 } from "babylonjs";
import { CircleTangentCalc } from "../../../src/model/math/CircleTangentCalc";
import { Circle } from "../../../src/model/shape/Circle";

describe('Calculating tangent to circle from external point', () => {

    it ('one of the tangents is horizontal', () => {
        const p = new Vector2(-5, 4);
        const circle = new Circle(new Vector2(0, 2), 2);

        const calc = new CircleTangentCalc(circle);
        const [lineEquation1, lineEquation2] = calc.getTangentLines(p);
        
        expect(lineEquation1.toString()).toEqual('y = -0.95 * x + -0.76');
        expect(lineEquation2.toString()).toEqual('y = 0 * x + 4');
    });

    it ('one of the tangents is vertical', () => {
        const p = new Vector2(2, 2);
        const circle = new Circle(new Vector2(1, 4), 1);

        const calc = new CircleTangentCalc(circle);
        const [lineEquation1, lineEquation2] = calc.getTangentLines(p);

        expect(lineEquation1.toString()).toEqual('Vertical line with x intercept of 2');
        expect(lineEquation2.toString()).toEqual('Vertical line with x intercept of 2');
    });

    it ('external point has the same y val as cicle center', () => {
        const p = new Vector2(10, 3);
        const circle = new Circle(new Vector2(1, 3), 2);

        const calc = new CircleTangentCalc(circle);
        const [lineEquation1, lineEquation2] = calc.getTangentLines(p);

        expect(lineEquation1.toString()).toEqual('y = -0.22 * x + 5.27');
        expect(lineEquation2.toString()).toEqual('y = 0.22 * x + 0.72');
    });

    it ('internal point', () => {
        const p = new Vector2(1, 1);
        const circle = new Circle(new Vector2(0, 0), 2);

        const calc = new CircleTangentCalc(circle);
        const lines = calc.getTangentLines(p);

        expect(lines).toBeFalsy();
    });

    it ('point is on circle border', () => {
        const p = new Vector2(3, 1);
        const circle = new Circle(new Vector2(1, 1), 2);

        const calc = new CircleTangentCalc(circle);
        const lines = calc.getTangentLines(p);
        
        expect(lines).toBeFalsy();
    });
});