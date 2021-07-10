import { Vector3 } from "babylonjs";
import { CurvedPathShape } from "../../../../src/model/math/path/CurvedPathShape";
import { GraphEdge } from "../../../../src/service/graph/GraphEdge";
import { GraphVertex } from "../../../../src/service/graph/GraphImpl";
import { TestHelper } from "../../../test_utils/TestHelper";


describe('FromEdge', () => {
    it ('creates a curved path from a GraphEdge', () => {
        const graphEdge = new GraphEdge(new GraphVertex('v1', new Vector3(1, 0, 1)), new GraphVertex('v2', new Vector3(10, 0, 1)));

        const pathShape = new CurvedPathShape([graphEdge.v1.p, graphEdge.v2.p], 0.05);
        TestHelper.numListCloseTo(
            pathShape.path[0].map(p => p.x),
            [0.983, 1.884, 2.787, 3.690, 4.595, 5.5, 6.404, 7.309, 8.212, 9.115, 10.016]
        );
        TestHelper.numListCloseTo(
            pathShape.path[0].map(p => p.z),
            [1.0185, 1.829, 2.461, 2.913, 3.184, 3.225, 3.184, 2.913, 2.461, 1.829, 1.018]
        );
        TestHelper.numListAllCloseTo(pathShape.path[0].map(p => p.y), 0);

        TestHelper.numListCloseTo(
            pathShape.path[1].map(p => p.x),
            [1.0167, 1.915, 2.812, 3.709, 4.604, 5.5, 6.395, 7.290, 8.187, 9.084, 9.983]
        );

        TestHelper.numListCloseTo(
            pathShape.path[1].map(p => p.z),
            [0.981, 1.790, 2.418, 2.866, 3.135, 3.275, 3.135, 2.866, 2.418, 1.790, 0.981]
        );
        TestHelper.numListAllCloseTo(pathShape.path[1].map(p => p.y), 0);
    });
});