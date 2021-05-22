import { GraphEdge } from "../../../service/graph/GraphImpl";

export interface RouteStoryConfig {
    routeId: string;
    characterId: string;
}

export interface RouteItemConfig {
    name?: string,
    isReversedIfSingleEdge?: boolean
}

export class RouteItem {
    readonly name: string;
    private edges: GraphEdge[];
    private isReversedList: boolean[];

    constructor(edges: GraphEdge[], config: RouteItemConfig) {
        this.edges = edges;
        this.isReversedList = this.getIsReversedList(config.isReversedIfSingleEdge);
        this.name = config.name;
    }

    reverse(): RouteItem {
        const isReversedIfSingleEdge = this.edges.length > 0 ? !this.isReversed(this.edges[0]) : false;
        return new RouteItem([...this.edges].reverse(), { name: this.name, isReversedIfSingleEdge });
    }

    isReversed(edge: GraphEdge): boolean {
        return this.isReversedList[this.edges.indexOf(edge)];
    }

    addEdge(edge: GraphEdge): RouteItem {
        return new RouteItem([...this.edges, edge], { name: this.name });
    }

    removeLastEdge(): RouteItem {
        if (this.edges.length === 0) { throw new Error('No edge to remove.'); }
        const clone = [...this.edges];
        clone.pop();
        const isReversedIfSingleEdge = clone.length > 0 ? this.isReversed(clone[0]) : false;
        return new RouteItem(clone, { name: this.name, isReversedIfSingleEdge });
    }

    removeFirstEdge() {
        if (this.edges.length === 0) { throw new Error('No edge to remove.'); }
        const clone = [...this.edges];
        clone.shift();
        const isReversedIfSingleEdge = clone.length > 0 ? this.isReversed(clone[0]) : false;
        return new RouteItem(clone, { name: this.name, isReversedIfSingleEdge });
    }

    getEdges(): GraphEdge[] {
        return this.edges;
    }

    private getIsReversedList(isReversedIfSingleEdge: boolean = false): boolean[] {
        const edges = this.edges;

        if (edges.length === 0) { return []; }
        if (edges.length === 1) { return [isReversedIfSingleEdge]; }

        const isFirstReversed = edges[1].hasVertex(edges[0].v1) ? true : false;
        const isReversedList: boolean[] = [ isFirstReversed ];

        for (let i = 1; i < this.edges.length; i++) {
            const isReversed = edges[i - 1].hasVertex(edges[i].v2) ? true : false;
            isReversedList.push(isReversed);
        }

        return isReversedList;
    }
}