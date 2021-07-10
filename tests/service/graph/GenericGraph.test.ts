import { GenericGraph, GenericGraphConfig, GenericGraphEdge } from "../../../src/service/graph/GenericGraph";

it ('finds edges between two vertices', () => {
    const vertices = [0, 1, 2, 3, 4, 5];
    const edges = [{v1: 0, v2: 1}, {v1: 0, v2: 3}, {v1: 1, v2: 4}, {v1: 4, v2: 5}];
    const config: GenericGraphConfig<number, GenericGraphEdge<number>> = { getVertices: (e) => [e.v1, e.v2], isBidirectional: () => true }

    const graph = new GenericGraph<number, GenericGraphEdge<number>>(vertices, edges, config);

    expect(graph.edgeBetween(0, 1)).toEqual({v1: 0, v2: 1});
    expect(graph.edgeBetween(0, 2)).toBeFalsy();
    expect(graph.edgeBetween(4, 5)).toEqual({v1: 4, v2: 5});
});

it ('finds neighbours of vertices', () => {
    const vertices = [0, 1, 2, 3, 4, 5];
    const edges = [{v1: 0, v2: 1}, {v1: 0, v2: 3}, {v1: 1, v2: 4}, {v1: 4, v2: 5}];
    const config: GenericGraphConfig<number, GenericGraphEdge<number>> = { getVertices: (e) => [e.v1, e.v2], isBidirectional: () => true }

    const graph = new GenericGraph<number, GenericGraphEdge<number>>(vertices, edges, config);

    expect(Array.from(graph.getNeighbours(0))).toEqual([1, 3]);
    expect(Array.from(graph.getNeighbours(2))).toEqual([]);
    expect(Array.from(graph.getNeighbours(1))).toEqual([0, 4]);
    expect(Array.from(graph.getNeighbours(5))).toEqual([4]);
});

it ('removes edge', () => {
    const vertices = [0, 1, 2, 3, 4, 5];
    const edges = [{v1: 0, v2: 1}, {v1: 0, v2: 3}, {v1: 1, v2: 4}, {v1: 4, v2: 5}];
    const config: GenericGraphConfig<number, GenericGraphEdge<number>> = { getVertices: (e) => [e.v1, e.v2], isBidirectional: () => true }

    const graph = new GenericGraph<number, GenericGraphEdge<number>>(vertices, edges, config);

    const edge0 = edges[0];
    const edge2 = edges[2];
    const edge3 = edges[3];

    expect(graph.edgeBetween(0, 1)).toBeTruthy();
    expect(graph.edgeBetween(1, 4)).toBeTruthy();

    graph.removeEdge(edge0, true);

    expect(graph.edgeBetween(0, 1)).toBeFalsy();
    expect(Array.from(graph.getNeighbours(0))).toEqual([3]);
    expect(graph.edges.includes(edge0)).toBeFalsy();

    graph.removeEdge(edge2, true);
    expect(graph.edgeBetween(1, 4)).toBeFalsy();
    expect(Array.from(graph.getNeighbours(1))).toEqual([]);
    expect(Array.from(graph.getNeighbours(4))).toEqual([5]);
    expect(graph.edges.includes(edge2)).toBeFalsy();
    expect(graph.vertices.has(1)).toBeFalsy();
    expect(graph.vertices.has(4)).toBeTruthy();

    graph.removeEdge(edge3, false);
    expect(graph.edgeBetween(4, 5)).toBeFalsy();
    expect(Array.from(graph.getNeighbours(4))).toEqual([]);
    expect(Array.from(graph.getNeighbours(5))).toEqual([]);
    expect(graph.edges.includes(edge3)).toBeFalsy();
    expect(graph.vertices.has(4)).toBeTruthy();
    expect(graph.vertices.has(5)).toBeTruthy();
});

it ('adds edge', () => {
    const vertices = [0, 1, 2, 3, 4, 5];
    const edges: GenericGraphEdge<number>[] = [{v1: 0, v2: 1}, {v1: 1, v2: 4}];
    const config: GenericGraphConfig<number, GenericGraphEdge<number>> = { getVertices: (e) => [e.v1, e.v2], isBidirectional: () => true }

    const graph = new GenericGraph<number, GenericGraphEdge<number>>(vertices, edges, config);

    let edge = {v1: 0, v2: 3};
    graph.addEdge(edge);
    expect(graph.edgeBetween(0, 3)).toBeTruthy();
    expect(Array.from(graph.getNeighbours(0))).toEqual([1, 3]);
    expect(Array.from(graph.getNeighbours(3))).toEqual([0]);
    expect(graph.edges.includes(edge)).toBeTruthy();

    edge = {v1: 4, v2: 5};
    graph.addEdge(edge);
    expect(graph.edgeBetween(4, 5)).toBeTruthy();
    expect(Array.from(graph.getNeighbours(4))).toEqual([1, 5]);
    expect(Array.from(graph.getNeighbours(5))).toEqual([4]);
    expect(graph.edges.includes(edge)).toBeTruthy();
});

it ('replace vertex', () => {
    const vertices = [0, 1, 2];
    const edges = [{v1: 0, v2: 1}, {v1: 1, v2: 2}];
    const config: GenericGraphConfig<number, GenericGraphEdge<number>> = { getVertices: (e) => [e.v1, e.v2], isBidirectional: () => true }

    const graph = new GenericGraph<number, GenericGraphEdge<number>>(vertices, edges, config);

    graph.replaceVertex(2, 3);
    // expect(Array.from())
    // 1;
});