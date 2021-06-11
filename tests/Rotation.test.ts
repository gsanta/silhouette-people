import { Tools, Vector2 } from "babylonjs";
import { DIRECTION, Rotation } from "../src/model/math/Rotation";

describe('diffRad', () => {
    it ('compare EAST to NORTH', () => {
        const east = Rotation.FromVector(DIRECTION.E());
        const north = Rotation.FromVector(DIRECTION.N());

        expect(east.diff(north.rad).rad).toBeCloseTo(Math.PI / 2);
    });

    it ('compare EAST to SOUTH', () => {
        const east = Rotation.FromVector(DIRECTION.E());
        const south = Rotation.FromVector(DIRECTION.S());

        expect(east.diff(south.rad).rad).toBeCloseTo(-Math.PI / 2);
    });

    it ('compare EAST to NORTWEST', () => {
        const east = Rotation.FromVector(DIRECTION.E());
        const northWest = Rotation.FromVector(DIRECTION.NW());

        expect(east.diff(northWest.rad).rad).toBeCloseTo(2.356);
    });

    it ('compare WEST to NORTHEAST', () => {
        const west = Rotation.FromVector(DIRECTION.W());
        const northEast = Rotation.FromVector(DIRECTION.NE());
        expect(west.diff(northEast.rad).rad).toBeCloseTo(-2.356);
    });
});

describe('FromVector', () => {

    it ('vector direction is NORTH', () => {
        const rotation = Rotation.FromVector(new Vector2(0, 1));

        expect(rotation.rad).toBeCloseTo(Math.PI / 2);
    });

    it ('vector direction is EAST', () => {
        const rotation = Rotation.FromVector(new Vector2(1, 0));

        expect(rotation.rad).toBeCloseTo(0);
    });

    it ('vector direction is SOUTH', () => {
        const rotation = Rotation.FromVector(new Vector2(0, -1));

        expect(rotation.rad).toBeCloseTo(3 * Math.PI / 2);
    });

    it ('vector direction is WEST', () => {
        const rotation = Rotation.FromVector(new Vector2(-1, 0));

        expect(rotation.rad).toBeCloseTo(Math.PI);
    });
});

describe("toVector3", () => {
    it ('handles 0 deg', () => {
        const vector = new Rotation(0).toVector3();
        expect(vector.x).toBe(0);
        expect(vector.y).toBe(0);
        expect(vector.z).toBe(1);
    });
    
    it ('handles 90 deg', () => {
        const vector = new Rotation(Tools.ToRadians(90)).toVector3();
        expect(vector.x).toBeCloseTo(-1);
        expect(vector.y).toBeCloseTo(0);
        expect(vector.z).toBeCloseTo(0);
    });

    it ('handles -90 deg', () => {
        const vector = new Rotation(Tools.ToRadians(-90)).toVector3();
        expect(vector.x).toBeCloseTo(1);
        expect(vector.y).toBeCloseTo(0);
        expect(vector.z).toBeCloseTo(0);
    });

    it ('handles 45 deg', () => {
        const vector = new Rotation(Tools.ToRadians(45)).toVector3();
        expect(vector.x).toBeCloseTo(-0.707);
        expect(vector.y).toBeCloseTo(0);
        expect(vector.z).toBeCloseTo(0.707);
    });
});