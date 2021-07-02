import { GenericGraph, GenericGraphConfig } from "../../../src/service/graph/GenericGraph";
import { Graph } from "../../../src/service/graph/Graph";


it ('finds edges between two vertices', () => {
    const vertices = [0, 1, 2, 3, 4, 5];
    const edges: [number, number][] = [[0, 1], [0, 3], [1, 4], [4, 5]];
    const config: GenericGraphConfig<number, [number, number]> = { getVertices: (e) => e }

    const graph: Graph<number, [number, number]> = new GenericGraph<number, [number, number]>(vertices, edges, config);

    expect(graph.edgeBetween(0, 1)).toEqual([0, 1]);
    expect(graph.edgeBetween(0, 2)).toBeFalsy();
    expect(graph.edgeBetween(4, 5)).toEqual([4, 5]);
});

it ('finds neighbours of vertices', () => {
    const vertices = [0, 1, 2, 3, 4, 5];
    const edges: [number, number][] = [[0, 1], [0, 3], [1, 4], [4, 5]];
    const config: GenericGraphConfig<number, [number, number]> = { getVertices: (e) => e }

    const graph: Graph<number, [number, number]> = new GenericGraph<number, [number, number]>(vertices, edges, config);

    expect(Array.from(graph.getNeighbours(0))).toEqual([1, 3]);
    expect(Array.from(graph.getNeighbours(2))).toEqual([]);
    expect(Array.from(graph.getNeighbours(1))).toEqual([0, 4]);
    expect(Array.from(graph.getNeighbours(5))).toEqual([4]);
});

it ('removes edge', () => {
    const vertices = [0, 1, 2, 3, 4, 5];
    const edges: [number, number][] = [[0, 1], [0, 3], [1, 4], [4, 5]];
    const config: GenericGraphConfig<number, [number, number]> = { getVertices: (e) => e }

    const graph: Graph<number, [number, number]> = new GenericGraph<number, [number, number]>(vertices, edges, config);

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
    const edges: [number, number][] = [[0, 1], [1, 4]];
    const config: GenericGraphConfig<number, [number, number]> = { getVertices: (e) => e }

    const graph: Graph<number, [number, number]> = new GenericGraph<number, [number, number]>(vertices, edges, config);

    let edge: [number, number] = [0, 3];
    graph.addEdge(edge);
    expect(graph.edgeBetween(0, 3)).toBeTruthy();
    expect(Array.from(graph.getNeighbours(0))).toEqual([1, 3]);
    expect(Array.from(graph.getNeighbours(3))).toEqual([0]);
    expect(graph.edges.includes(edge)).toBeTruthy();

    edge = [4, 5];
    graph.addEdge(edge);
    expect(graph.edgeBetween(4, 5)).toBeTruthy();
    expect(Array.from(graph.getNeighbours(4))).toEqual([1, 5]);
    expect(Array.from(graph.getNeighbours(5))).toEqual([4]);
    expect(graph.edges.includes(edge)).toBeTruthy();
});