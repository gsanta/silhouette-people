import { Vector3 } from "babylonjs/Maths/math.vector";


export class TestHelper {


    static vector3Equals(vector3: Vector3, x: number, y: number, z: number) {
        expect(vector3.x).toBeCloseTo(x);
        expect(vector3.y).toBeCloseTo(y);
        expect(vector3.z).toBeCloseTo(z);
    }
}