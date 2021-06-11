import { Vector3 } from "babylonjs"
import { GraphEdge } from "../../../src/service/graph/GraphEdge"
import { GraphVertex } from "../../../src/service/graph/GraphImpl"


describe('angle and opposite angle', () => {

    it ('horizontal graph edge', () => {
        const graphEdge = new GraphEdge(new GraphVertex('v1', new Vector3(1, 0, 1)), new GraphVertex('v2', new Vector3(5, 0, 1)));

        expect(graphEdge.angle.rad).toBeCloseTo(0);
        expect(graphEdge.oppositeAngle.rad).toBeCloseTo(Math.PI);
    });

    it ('vertical graph edge', () => {
        const graphEdge = new GraphEdge(new GraphVertex('v1', new Vector3(1, 0, 1)), new GraphVertex('v2', new Vector3(1, 0, 5)));

        expect(graphEdge.angle.rad).toBeCloseTo(Math.PI / 2);
        expect(graphEdge.oppositeAngle.rad).toBeCloseTo(3 * Math.PI / 2);
    });

    it ('45 deg edge', () => {
        const graphEdge = new GraphEdge(new GraphVertex('v1', new Vector3(1, 0, 1)), new GraphVertex('v2', new Vector3(3, 0, 3)));

        expect(graphEdge.angle.rad).toBeCloseTo(Math.PI / 4);
        expect(graphEdge.oppositeAngle.rad).toBeCloseTo(5 * Math.PI / 4);
    });
})