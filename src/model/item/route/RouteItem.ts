import { GraphEdge } from "../../../service/graph/GraphImpl";

export interface RouteStoryConfig {
    routeId: string;
    characterId: string;
}

export class RouteItem {
    readonly name: string;
    private edges: GraphEdge[];

    constructor(edges: GraphEdge[], name?: string) {
        this.edges = edges;

        this.name = name;
    }

    reverse(): RouteItem {
        return new RouteItem([...this.edges].reverse());
    }

    addEdge(edge: GraphEdge): RouteItem {
        return new RouteItem([...this.edges, edge], this.name);
    }

    removeLastEdge(): RouteItem {
        const clone = [...this.edges];
        clone.pop();
        return new RouteItem(clone, this.name);
    }

    removeFirstEdge() {
        const clone = [...this.edges];
        clone.shift();
        return new RouteItem(clone, this.name);
    }

    getEdges(): GraphEdge[] {
        return this.edges;
    }
}