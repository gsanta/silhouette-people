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