import { Vector3 } from "babylonjs";
import { GraphEdge } from "../../../src/service/graph/GraphEdge";
import { GraphImpl, GraphVertex } from "../../../src/service/graph/GraphImpl";

it('general test for GraphImpl', () => {
    const vertices: GraphVertex[] = [
        new GraphVertex('1', new Vector3(1, 0, 1)),
        new GraphVertex('2', new Vector3(5, 0, 1)),
        new GraphVertex('3', new Vector3(5, 0, 10)),
        new GraphVertex('4', new Vector3(10, 0, 10)),
    ];

    const edges: GraphEdge[] = [
        new GraphEdge(vertices[0], vertices[1]),
        new GraphEdge(vertices[1], vertices[2]),
        new GraphEdge(vertices[2], vertices[3]),
        new GraphEdge(vertices[0], vertices[3]),
    ];

    const graph: GraphImpl = new GraphImpl(vertices, edges);

    expect(graph.edgeBetween(vertices[0], vertices[1])).toBeTruthy();
    expect(graph.edgeBetween(vertices[0], vertices[3])).toBeTruthy();
    expect(Array.from(graph.getNeighbours(vertices[0]))).toEqual([vertices[1], vertices[3]]);

    const newVertex: GraphVertex = new GraphVertex('5', new Vector3(15, 0, 10));
    const newEdge: GraphEdge = new GraphEdge(vertices[3], newVertex);
    graph.addEdge(newEdge);
    expect(graph.edgeBetween(vertices[3], newVertex)).toBeTruthy();
    expect(graph.edgeBetween(newVertex, vertices[3])).toBeTruthy();
    expect(Array.from(graph.getNeighbours(newVertex))).toEqual([vertices[3]]);
    expect(Array.from(graph.getNeighbours(vertices[3]))).toEqual([vertices[2], vertices[0], newVertex]);

    graph.removeEdge(edges[0], true);
    expect(graph.edges.includes(edges[0])).toBeFalsy();
    expect(graph.vertices.has(vertices[0])).toBeTruthy();
    expect(graph.vertices.has(vertices[1])).toBeTruthy();
    expect(graph.edgeBetween(vertices[0], vertices[1])).toBeFalsy();
    expect(Array.from(graph.getNeighbours(vertices[3]))).toEqual([vertices[2], vertices[0], newVertex]);

    graph.removeEdge(edges[3], true);
    expect(graph.edges.includes(edges[3])).toBeFalsy();
    expect(graph.vertices.has(vertices[0])).toBeFalsy();
    expect(Array.from(graph.getNeighbours(vertices[3]))).toEqual([vertices[2], newVertex]);
});

describe('edge directions in graph', () => {
    let vertices: GraphVertex[];
    let edges: GraphEdge[];
    let graph: GraphImpl;

    beforeEach(() => {
        vertices = [
            new GraphVertex('1', new Vector3(1, 0, 1)),
            new GraphVertex('2', new Vector3(5, 0, 1)),
            new GraphVertex('3', new Vector3(5, 0, 10)),
            new GraphVertex('4', new Vector3(10, 0, 10)),
        ];
    
        edges = [
            new GraphEdge(vertices[0], vertices[1], undefined, 1, true),
            new GraphEdge(vertices[1], vertices[2], undefined, 1, true),
            new GraphEdge(vertices[2], vertices[3], undefined, 1, true),
            new GraphEdge(vertices[0], vertices[3], undefined, 1, false)
        ];

        graph = new GraphImpl(vertices, edges);
    });

    it ('initializing graph with directed edges', () => {
        expect(graph.edgeBetween(vertices[0], vertices[1])).toBe(edges[0]);
        expect(graph.edgeBetween(vertices[1], vertices[0])).toBeFalsy();
        expect(Array.from(graph.getNeighbours(vertices[0]))).toEqual([vertices[1], vertices[3]]);
        expect(Array.from(graph.getNeighbours(vertices[1]))).toEqual([vertices[2]]);

        expect(graph.edgeBetween(vertices[0], vertices[3])).toBe(edges[3]);
        expect(graph.edgeBetween(vertices[3], vertices[0])).toBe(edges[3]);
        expect(Array.from(graph.getNeighbours(vertices[3]))).toEqual([vertices[0]]);


    });

    it ('clearing edge direction', () => {
        edges[0].direction = undefined;
    
        expect(graph.edgeBetween(vertices[0], vertices[1])).toBe(edges[0]);
        expect(graph.edgeBetween(vertices[1], vertices[0])).toBe(edges[0]);
        expect(Array.from(graph.getNeighbours(vertices[0]))).toEqual([vertices[3], vertices[1]]);
        expect(Array.from(graph.getNeighbours(vertices[1]))).toEqual([vertices[2], vertices[0]]);
    });

    it ('setting edge direction', () => {
        edges[3].direction = [edges[3].v2, edges[3].v1];
    
        expect(graph.edgeBetween(vertices[0], vertices[3])).toBeFalsy();
        expect(graph.edgeBetween(vertices[3], vertices[0])).toBe(edges[3]);
        expect(Array.from(graph.getNeighbours(vertices[0]))).toEqual([vertices[1]]);
        expect(Array.from(graph.getNeighbours(vertices[3]))).toEqual([vertices[0]]);
    });
});