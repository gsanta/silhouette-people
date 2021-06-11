import { Vector2 } from "babylonjs";
import { LineEquation } from "../../../src/model/math/LineEquation";
import { LineSideCalc } from "../../../src/model/math/LineSideCalc";


describe('getSide', () => {

    it ('horizontal line', () => {

        const lineSideCalc = new LineSideCalc(new LineEquation(0, 3));

        expect(lineSideCalc.getSide(new Vector2(6, 5))).toBeLessThan(0);
        expect(lineSideCalc.getSide(new Vector2(-1, 4))).toBeLessThan(0);
        expect(lineSideCalc.getSide(new Vector2(1, 2))).toBeGreaterThan(0);
        expect(lineSideCalc.getSide(new Vector2(4, -1))).toBeGreaterThan(0);
    });

    it ('vertical line', () => {

        const lineSideCalc = new LineSideCalc(LineEquation.Vertical(2));

        expect(lineSideCalc.getSide(new Vector2(1, 1))).toBeLessThan(0);
        expect(lineSideCalc.getSide(new Vector2(-1, 4))).toBeLessThan(0);
        expect(lineSideCalc.getSide(new Vector2(3, 2))).toBeGreaterThan(0);
        expect(lineSideCalc.getSide(new Vector2(4, -1))).toBeGreaterThan(0);
    });

    it ('45 deg line', () => {

        const lineSideCalc = new LineSideCalc(new LineEquation(1, 2));

        expect(lineSideCalc.getSide(new Vector2(0, 3))).toBeLessThan(0);
        expect(lineSideCalc.getSide(new Vector2(5, 10))).toBeLessThan(0);
        expect(lineSideCalc.getSide(new Vector2(0, 0))).toBeGreaterThan(0);
        expect(lineSideCalc.getSide(new Vector2(5, 1))).toBeGreaterThan(0);
    });

    it ('-45 deg line', () => {

        const lineSideCalc = new LineSideCalc(new LineEquation(-1, 2));

        expect(lineSideCalc.getSide(new Vector2(0, 3))).toBeGreaterThan(0);
        expect(lineSideCalc.getSide(new Vector2(5, -2))).toBeGreaterThan(0);
        expect(lineSideCalc.getSide(new Vector2(0, 0))).toBeLessThan(0);
        expect(lineSideCalc.getSide(new Vector2(-5, 5))).toBeLessThan(0);
    });
});