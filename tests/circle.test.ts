import { Vector2 } from "babylonjs";
import { Circle } from "../src/model/shape/Circle";

describe('Calculating tangent to circle from external point', () => {

    it ('test when one of the tangents is horizontal', () => {
        const externalPoint = new Vector2(-5, 4);
        const circle = new Circle(new Vector2(0, 2), 2);

        const [lineEquation1, lineEquation2] = circle.tangentFromExternalPoint(externalPoint);
        
        expect(lineEquation1.toString()).toEqual('y = 0 * x + 4');
        expect(lineEquation2.toString()).toEqual('y = -0.95 * x + 0.84');
    });

    it ('test when one of the tangents is vertical', () => {
        const externalPoint = new Vector2(2, 2);
        const circle = new Circle(new Vector2(1, 4), 1);

        const [lineEquation1, lineEquation2] = circle.tangentFromExternalPoint(externalPoint);

        expect(lineEquation1.toString()).toEqual('Vertical line with x intercept of 2');
        expect(lineEquation2.toString()).toEqual('Vertical line with x intercept of 2');
    });

    it ('test when external point has the same y val as cicle center', () => {
        const externalPoint = new Vector2(10, 3);
        const circle = new Circle(new Vector2(1, 3), 2);

        const [lineEquation1, lineEquation2] = circle.tangentFromExternalPoint(externalPoint);

        expect(lineEquation1.toString()).toEqual('y = -0.22 * x + -1.31');
        expect(lineEquation2.toString()).toEqual('y = 0.22 * x + 1.31');
    });
});