import { Vector2 } from "babylonjs";
import { LineEquation } from "../src/model/math/LineEquation";
import { Circle } from "../src/model/shape/Circle";

// describe('Calculating tangent to circle from external point', () => {

//     it ('test when one of the tangents is horizontal', () => {
//         const externalPoint = new Vector2(-5, 4);
//         const circle = new Circle(new Vector2(0, 2), 2);

//         const [lineEquation1, lineEquation2] = circle.tangentFromExternalPoint(externalPoint);
        
//         expect(lineEquation1.toString()).toEqual('y = 0 * x + 4');
//         expect(lineEquation2.toString()).toEqual('y = -0.95 * x + 0.84');
//     });

//     it ('test when one of the tangents is vertical', () => {
//         const externalPoint = new Vector2(2, 2);
//         const circle = new Circle(new Vector2(1, 4), 1);

//         const [lineEquation1, lineEquation2] = circle.tangentFromExternalPoint(externalPoint);

//         expect(lineEquation1.toString()).toEqual('Vertical line with x intercept of 2');
//         expect(lineEquation2.toString()).toEqual('Vertical line with x intercept of 2');
//     });

//     it ('test when external point has the same y val as cicle center', () => {
//         const externalPoint = new Vector2(10, 3);
//         const circle = new Circle(new Vector2(1, 3), 2);

//         const [lineEquation1, lineEquation2] = circle.tangentFromExternalPoint(externalPoint);

//         expect(lineEquation1.toString()).toEqual('y = -0.22 * x + -1.31');
//         expect(lineEquation2.toString()).toEqual('y = 0.22 * x + 1.31');
//     });
// });

describe('Intersection of circle with line', () => {
    // it ('vertical line with circle in the origo', () => {
    //     const circle = new Circle(new Vector2(0, 0), 2);
    //     const line = new LineEquation(undefined, undefined, 1);

    //     const [p1, p2] = circle.intersection(line);

    //     expect(p1.y).toBeCloseTo(1.732);
    //     expect(p1.x).toBe(1);
    //     expect(p2.y).toBeCloseTo(-1.732);
    //     expect(p2.x).toBe(1);
    // });

    // it ('vertical line, circle not in the origo', () => {
    //     const circle = new Circle(new Vector2(2, 1), 2);
    //     const line = new LineEquation(undefined, undefined, 2);

    //     const [p1, p2] = circle.intersection(line);

    //     expect(p1.y).toBe(3);
    //     expect(p1.x).toBe(2);
    //     expect(p2.y).toBe(-1);
    //     expect(p2.x).toBe(2);
    // });

    // it ('horizontal line', () => {
    //     const circle = new Circle(new Vector2(-2, 3), 3);
    //     const line = new LineEquation(0, 3, undefined);

    //     const [p1, p2] = circle.intersection(line);

    //     expect(p1.y).toBe(3);
    //     expect(p1.x).toBe(1);
    //     expect(p2.y).toBe(3);
    //     expect(p2.x).toBe(-5);
    // });

    // it ('line with positive m', () => {
    //     const circle = new Circle(new Vector2(3, 2), 2);
    //     const line = new LineEquation(1, -1, undefined);

    //     const [p1, p2] = circle.intersection(line);

    //     expect(p1.x).toBeCloseTo(4.414);
    //     expect(p1.y).toBeCloseTo(3.414);
    //     expect(p2.x).toBeCloseTo(1.585);
    //     expect(p2.y).toBeCloseTo(0.585);
    // });

    // it ('line with negative m', () => {
    //     const circle = new Circle(new Vector2(2, 1), 1);
    //     const line = new LineEquation(-0.5, 2, undefined);

    //     const [p1, p2] = circle.intersection(line);

    //     expect(p1.x).toBeCloseTo(2.894);
    //     expect(p1.y).toBeCloseTo(0.552);
    //     expect(p2.x).toBeCloseTo(1.105);
    //     expect(p2.y).toBeCloseTo(1.447);
    // });

    // it ('one intersection point', () => {
    //     const circle = new Circle(new Vector2(2, 1), 1);
    //     const line = new LineEquation(0, 2, undefined);

    //     const [p1, p2] = circle.intersection(line);

    //     expect(p1.x).toBe(2);
    //     expect(p1.y).toBe(2);
    //     expect(p2).toBeFalsy();
    // });

    // it ('one intersection point with vertical line', () => {
    //     const circle = new Circle(new Vector2(1, 3), 2);
    //     const line = new LineEquation(undefined, undefined, 3);

    //     const [p1, p2] = circle.intersection(line);
    //     expect(p1.x).toBe(3);
    //     expect(p1.y).toBe(3);
    //     expect(p2.x).toBe(3);
    //     expect(p2.y).toBe(3);
    // });

    // it ('zero intersection points horizontal line', () => {
    //     const circle = new Circle(new Vector2(0, 0), 2);

    //     const line = new LineEquation(0, 3, undefined);
    //     const [p1, p2] = circle.intersection(line);

    //     expect(p1).toBeFalsy();
    //     expect(p2).toBeFalsy();
    // });

    it ('zero intersection points vertical line', () => {
        const circle = new Circle(new Vector2(0, 0), 2);

        const line = new LineEquation(undefined, undefined, 3);
        const [p1, p2] = circle.intersection(line);

        expect(p1).toBeFalsy();
        expect(p2).toBeFalsy();
    });
});