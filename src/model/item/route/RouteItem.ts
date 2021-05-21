import { GraphEdge } from "../../../service/graph/GraphImpl";

export interface RouteStoryConfig {
    routeId: string;
    characterId: string;
}

export class RouteItem {
    readonly name: string;
    private edges: GraphEdge[];
    private isReversedList: boolean[];

    constructor(edges: GraphEdge[], name?: string) {
        this.edges = edges;
        this.isReversedList = this.getIsReversedList();
        this.name = name;
    }

    reverse(): RouteItem {
        return new RouteItem([...this.edges].reverse());
    }

    isReversed(edge: GraphEdge): boolean {
        return this.isReversedList[this.edges.indexOf(edge)];
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

    private getIsReversedList(): boolean[] {
        const edges = this.edges;

        if (edges.length === 0) { return []; }
        if (edges.length === 1) { return [false]; }

        const isFirstReversed = edges[1].hasVertex(edges[0].v1) ? true : false;
        const isReversedList: boolean[] = [ isFirstReversed ];

        for (let i = 1; i < this.edges.length; i++) {
            const isReversed = edges[i - 1].hasVertex(edges[i].v2) ? true : false;
            isReversedList.push(isReversed);
        }

        return isReversedList;
    }
}