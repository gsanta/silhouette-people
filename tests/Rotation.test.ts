import { Tools, Vector2 } from "babylonjs";
import { Rotation } from "../src/model/math/Rotation";

describe('diffRad', () => {
    it ('compare EAST to NORTH', () => {
        const rotation = new Rotation(new Vector2(1, 0));

        expect(rotation.diff(new Vector2(0, 1))).toBeCloseTo(Math.PI / 2);
    });

    it ('compare EAST to SOUTH', () => {
        const rotation = new Rotation(new Vector2(1, 0));

        expect(rotation.diff(new Vector2(0, -1))).toBeCloseTo(-Math.PI / 2);
    });

    it ('compare EAST to NORTWEST', () => {
        const rotation = new Rotation(new Vector2(1, 0));

        expect(rotation.diff(new Vector2(-1, 1))).toBeCloseTo(2.356);
    });

    it ('compare WEST to NORTHEAST', () => {
        const rotation = new Rotation(new Vector2(-1, 0));

        expect(rotation.diff(new Vector2(1, 1))).toBeCloseTo(-2.356);
    });
});

describe('rotationRad', () => {

    it ('vector direction is NORTH', () => {
        const rotation = new Rotation(new Vector2(0, 1));

        expect(rotation.rotationRad).toBeCloseTo(0);
    });

    it ('vector direction is EAST', () => {
        const rotation = new Rotation(new Vector2(1, 0));

        expect(rotation.rotationRad).toBeCloseTo(3 * Math.PI / 2);
    });

    it ('vector direction is SOUTH', () => {
        const rotation = new Rotation(new Vector2(0, -1));

        expect(rotation.rotationRad).toBeCloseTo(Math.PI);
    });

    it ('vector direction is WEST', () => {
        const rotation = new Rotation(new Vector2(-1, 0));

        expect(rotation.rotationRad).toBeCloseTo(Math.PI / 2);
    });
});

describe('addRotation', () => {
    it ('add neg 30deg to rotation EAST', () => {
        const rotation = new Rotation(new Vector2(1, 0));
        const newRotation = rotation.add(-Math.PI / 6);

        expect(newRotation.rotationRad).toBeCloseTo(Tools.ToRadians(240));
    });

    it ('add pos 30deg to rotation EAST', () => {
        const rotation = new Rotation(new Vector2(1, 0));
        const newRotation = rotation.add(Math.PI / 6);

        expect(newRotation.rotationRad).toBeCloseTo(Tools.ToRadians(300));
    });
});