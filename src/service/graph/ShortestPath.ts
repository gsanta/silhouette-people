import { Graph } from "./Graph";
import { PriorityQueue } from "./PriorityQueue";

export interface ShortestPathOptions<V> {
    avoid: V[];
    reverse?: boolean;
}

export class ShortestPath<V> {
    path(start: V, goal: V, graph: Graph<V, any>, options: ShortestPathOptions<V> = { avoid: [] }): V[] {
        // Don't run when we don't have nodes set
        if (!graph.size()) {
            return [];
        }

        const explored: Set<V> = new Set();
        const priorityQueue = new PriorityQueue<V>();
        const previous: Map<V, V> = new Map();

        let path = [];
        let totalCost = 0;

        let avoid = [];
        if (options.avoid) {
            avoid = [].concat(options.avoid)
        };

        if (avoid.includes(start)) {
            throw new Error(`Starting node (${start}) cannot be avoided`);
        } else if (avoid.includes(goal)) {
            throw new Error(`Ending node (${goal}) cannot be avoided`);
        }

        priorityQueue.set(start, 0);

        while (!priorityQueue.isEmpty()) {
            const node = priorityQueue.next();

            if (node.key === goal) {
                totalCost = node.priority;

                let nodeKey = node.key;
                while (previous.has(nodeKey)) {
                    path.push(nodeKey);
                    nodeKey = previous.get(nodeKey);
                }

                break;
            }

            explored.add(node.key);

            // Loop all the neighboring nodes
            const neighbours = graph.getNeighbours(node.key);
            const weightedNeighbours: Map<V, number> = new Map();
            neighbours.forEach(neighbour => weightedNeighbours.set(neighbour, 1));

            weightedNeighbours.forEach((nCost, nNode) => {
                if (explored.has(nNode) || avoid.includes(nNode)) { return };

                if (!priorityQueue.has(nNode)) {
                    previous.set(nNode, node.key);
                    priorityQueue.set(nNode, node.priority + nCost);
                } else {
                    const currentCost = priorityQueue.get(nNode).priority;
                    const nodeCost = node.priority + nCost;
    
                    if (nodeCost < currentCost) {
                        previous.set(nNode, node.key);
                        priorityQueue.set(nNode, nodeCost);
                    }
                }

            });
        }

        if (!path.length) {
            return [];
        }

        path = path.concat([start]);

        // Reverse the path if we don't want it reversed, so the result will be
        // from `start` to `goal`
        if (!options.reverse) {
            path = path.reverse();
        }

        return path;
    }
}