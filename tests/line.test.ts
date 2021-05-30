import { Tools, Vector2 } from "babylonjs";
import { LineShape } from "../src/model/shape/LineShape";


describe('Line angle', () => {

    it ('angle in first quadrant', () => {
        const line = new LineShape(new Vector2(2, 2), new Vector2(5, 5));

        expect(Tools.ToDegrees(line.angle)).toBe(45);
    });

    it ('angle in second quadrant', () => {
        const line = new LineShape(new Vector2(2, 2), new Vector2(-2, 6));

        expect(Tools.ToDegrees(line.angle)).toBe(135);
    });

    it ('angle in third quadrant', () => {
        const line = new LineShape(new Vector2(0, 0), new Vector2(-2, -1));

        expect(Math.round(Tools.ToDegrees(line.angle))).toBe(207);
    });

    it ('angle in fourth quadrant', () => {
        const line = new LineShape(new Vector2(0, 0), new Vector2(2, -2));

        expect(Tools.ToDegrees(line.angle)).toBe(315);
    });

    it ('angle 0', () => {
        const line = new LineShape(new Vector2(0, 0), new Vector2(2, 0));

        expect(Tools.ToDegrees(line.angle)).toBe(0);
    });
});