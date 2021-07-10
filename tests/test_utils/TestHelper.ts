import { Vector3 } from "babylonjs/Maths/math.vector";


export class TestHelper {


    static vector3Equals(vector3: Vector3, x: number, y: number, z: number) {
        expect(vector3.x).toBeCloseTo(x);
        expect(vector3.y).toBeCloseTo(y);
        expect(vector3.z).toBeCloseTo(z);
    }

    static numListCloseTo(expected: number[], actual: number[]) {
        if (expected.length !== actual.length) {
            throw new Error(`Length does not match: expected len (${expected.length}), actual len: (${actual.length})`);
        }

        expected.forEach((val, i) => expect(val).toBeCloseTo(actual[i]));
    }

    static numListAllCloseTo(expected: number[], actual: number) {
        expected.forEach((val, i) => expect(val).toBeCloseTo(actual));
    }
}