import { GenericGraph, GenericGraphConfig } from "../../../src/service/graph/GenericGraph";
import { Graph } from "../../../src/service/graph/Graph";
import { ShortestPath } from "../../../src/service/graph/ShortestPath";


it ('finds path between two vertices', () => {
    const vertices = [0, 1, 2, 3, 4, 5];
    const edges: [number, number][] = [[0, 1], [0, 3], [1, 4], [4, 5]];
    const config: GenericGraphConfig<number, [number, number]> = { getVertices: (e) => e }

    const graph: Graph<number, [number, number]> = new GenericGraph<number, [number, number]>(vertices, edges, config);
    const shortestPath = new ShortestPath<number>();

    const path = shortestPath.path(0, 5, graph)
    expect(path).toEqual([0, 1, 4, 5]);
});

it ('finds the shortest path between two vertices if there are multiple pathes', () => {
    const vertices = [0, 1, 2, 3, 4, 5, 6, 7];
    const edges: [number, number][] = [[0, 1], [0, 3], [1, 4], [4, 5], [5, 6], [6, 7], [3, 4], [4, 7]];
    const config: GenericGraphConfig<number, [number, number]> = { getVertices: (e) => e }

    const graph: Graph<number, [number, number]> = new GenericGraph<number, [number, number]>(vertices, edges, config);
    const shortestPath = new ShortestPath<number>();

    let path = shortestPath.path(0, 7, graph);
    expect(path).toEqual([0, 1, 4, 7]);

    graph.removeEdge(edges[7], true);
    path = shortestPath.path(0, 7, graph);
    expect(path).toEqual([0, 1, 4, 5, 6, 7]);
});

it ('finds empty path if there is no path between two vertices', () => {
    const vertices = [0, 1, 2, 3, 4, 5, 6, 7];
    const edges: [number, number][] = [[0, 1], [0, 3], [1, 4], [4, 5], [6, 7]];
    const config: GenericGraphConfig<number, [number, number]> = { getVertices: (e) => e }

    const graph: Graph<number, [number, number]> = new GenericGraph<number, [number, number]>(vertices, edges, config);
    const shortestPath = new ShortestPath<number>();

    let path = shortestPath.path(0, 7, graph);
    expect(path).toEqual([]);
});