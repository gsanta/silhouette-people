import { GenericGraph, GenericGraphConfig, GenericGraphEdge } from "../../../src/service/graph/GenericGraph";
import { ShortestPath } from "../../../src/service/graph/ShortestPath";

it ('finds path between two vertices', () => {
    const vertices = [0, 1, 2, 3, 4, 5];
    const edges = [{v1: 0, v2: 1}, {v1: 0, v2: 3}, {v1: 1, v2: 4}, {v1: 4, v2: 5}];
    const config: GenericGraphConfig<number, GenericGraphEdge<number>> = { getVertices: (e) => [e.v1, e.v2], isBidirectional: () => true }

    const graph = new GenericGraph<number, GenericGraphEdge<number>>(vertices, edges, config);
    const shortestPath = new ShortestPath<number>();

    const path = shortestPath.path(0, 5, graph)
    expect(path).toEqual([0, 1, 4, 5]);
});

it ('finds the shortest path between two vertices if there are multiple pathes', () => {
    const vertices = [0, 1, 2, 3, 4, 5, 6, 7];
    const edges = [{v1: 0, v2: 1}, {v1: 0, v2: 3}, {v1: 1, v2: 4}, {v1: 4, v2: 5}, {v1: 5, v2: 6}, {v1: 6, v2: 7}, {v1: 3, v2: 4}, {v1: 4, v2: 7}];
    const config: GenericGraphConfig<number, GenericGraphEdge<number>> = { getVertices: (e) => [e.v1, e.v2], isBidirectional: () => true }

    const graph = new GenericGraph<number, GenericGraphEdge<number>>(vertices, edges, config);
    const shortestPath = new ShortestPath<number>();

    let path = shortestPath.path(0, 7, graph);
    expect(path).toEqual([0, 1, 4, 7]);

    graph.removeEdge(edges[7], true);
    path = shortestPath.path(0, 7, graph);
    expect(path).toEqual([0, 1, 4, 5, 6, 7]);
});

it ('finds empty path if there is no path between two vertices', () => {
    const vertices = [0, 1, 2, 3, 4, 5, 6, 7];
    const edges = [{v1: 0, v2: 1}, {v1: 0, v2: 3}, {v1: 1, v2: 4}, {v1: 4, v2: 5}, {v1: 6, v2: 7}];
    const config: GenericGraphConfig<number, GenericGraphEdge<number>> = { getVertices: (e) => [e.v1, e.v2], isBidirectional: () => true }

    const graph = new GenericGraph<number, GenericGraphEdge<number>>(vertices, edges, config);
    const shortestPath = new ShortestPath<number>();

    let path = shortestPath.path(0, 7, graph);
    expect(path).toEqual([]);
});