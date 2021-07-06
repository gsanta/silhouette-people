import { Vector3 } from "babylonjs";
import { CurvedPathShape } from "../../../../src/model/math/path/CurvedPathShape";
import { GraphEdge } from "../../../../src/service/graph/GraphEdge";
import { GraphVertex } from "../../../../src/service/graph/GraphImpl";


describe('FromEdge', () => {

    it ('creates a curved path from a GraphEdge', () => {
        const graphEdge = new GraphEdge(new GraphVertex('v1', new Vector3(1, 0, 1)), new GraphVertex('v2', new Vector3(10, 0, 1)));

        const pathShape = CurvedPathShape.FromEdge(graphEdge);
        1
    });
});