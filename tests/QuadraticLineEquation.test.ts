import { QuadraticLineEquation } from "../src/model/math/QuadraticLineEquation";


describe('Solving quadratic equation', () => {

    it ('gives two roots', () => {
        const quadratic = new QuadraticLineEquation(2, -5, -3);
        expect(quadratic.solve()).toEqual([3, - 0.5]);
    });

    it ('gives one root if zero discriminant', () => {
        const quadratic = new QuadraticLineEquation(1, 4, 4);
        expect(quadratic.solve()).toEqual([-2, undefined]);
    });

    it ('gives undefined when denominator is zero', () => {
        const quadratic = new QuadraticLineEquation(0, 4, 4);
        expect(quadratic.solve()).toEqual(undefined);
    });
});