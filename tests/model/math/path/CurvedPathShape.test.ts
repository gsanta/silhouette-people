import { Vector3 } from "babylonjs";
import { CurvedPathShape } from "../../../../src/model/math/path/CurvedPathShape";
import { GraphEdge } from "../../../../src/service/graph/GraphEdge";
import { GraphVertex } from "../../../../src/service/graph/GraphImpl";
import { TestHelper } from "../../../test_utils/TestHelper";


describe('FromEdge', () => {

    it ('creates a curved path from a GraphEdge', () => {
        const graphEdge = new GraphEdge(new GraphVertex('v1', new Vector3(1, 0, 1)), new GraphVertex('v2', new Vector3(10, 0, 1)));

        const pathShape = new CurvedPathShape([graphEdge.v1.p, graphEdge.v2.p], 0.05);
        TestHelper.vector3Equals(pathShape.path[0][0], 1, 0.05, 1.025);
        TestHelper.vector3Equals(pathShape.path[0][1], 5.5, 0.05, 5.525);
        TestHelper.vector3Equals(pathShape.path[0][2], 10, 0.05, 1.025);

        TestHelper.vector3Equals(pathShape.path[1][0], 1, 0.05, 0.975);
        TestHelper.vector3Equals(pathShape.path[1][1], 5.5, 0.05, 5.475);
        TestHelper.vector3Equals(pathShape.path[1][2], 10, 0.05, 0.975);
    });
});