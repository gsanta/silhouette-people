import { Tools, Vector2 } from "babylonjs";
import { AngleShape } from "../src/model/shape/AngleShape";

describe('Get point with distance', () => {

    it ('first quadrant', () => {
        const angle = new AngleShape(new Vector2(1, 1), Tools.ToRadians(45));
        const p = angle.getPointWithDistance(Math.sqrt(2));
        expect(p.x).toBeCloseTo(2);
        expect(p.y).toBeCloseTo(2);
    });

    it ('second quadrant', () => {
        const angle = new AngleShape(new Vector2(0, 0), Tools.ToRadians(135));
        const p = angle.getPointWithDistance(Math.sqrt(2));
        expect(p.x).toBeCloseTo(-1);
        expect(p.y).toBeCloseTo(1);
    });

    it ('third quadrant', () => {
        const angle = new AngleShape(new Vector2(0, 0), Tools.ToRadians(225));
        const p = angle.getPointWithDistance(Math.sqrt(2));
        expect(p.x).toBeCloseTo(-1);
        expect(p.y).toBeCloseTo(-1);
    });

    it ('fourth quadrant', () => {
        const angle = new AngleShape(new Vector2(0, 0), Tools.ToRadians(315));
        const p = angle.getPointWithDistance(Math.sqrt(2));
        expect(p.x).toBeCloseTo(1);
        expect(p.y).toBeCloseTo(-1);
    });
});