import { GraphEdge } from "../../../service/graph/GraphImpl";

export interface RouteStoryConfig {
    routeId: string;
    characterId: string;
}

export interface RouteItemConfig {
    id?: string,
    isReversedIfSingleEdge?: boolean
}

export class RouteItem {
    readonly id: string;
    private edges: GraphEdge[];
    private isReversedList: boolean[];

    constructor(edges: GraphEdge[], config: RouteItemConfig) {
        this.edges = edges;
        this.isReversedList = this.getIsReversedList(config.isReversedIfSingleEdge);
        this.id = config.id;
    }

    reverse(): RouteItem {
        const isReversedIfSingleEdge = this.edges.length > 0 ? !this.isReversed(this.edges[0]) : false;
        return new RouteItem([...this.edges].reverse(), { id: this.id, isReversedIfSingleEdge });
    }

    isReversed(edge: GraphEdge): boolean {
        return this.isReversedList[this.edges.indexOf(edge)];
    }

    addEdge(edge: GraphEdge): RouteItem {
        return new RouteItem([...this.edges, edge], { id: this.id });
    }

    insert(index: number, edge: GraphEdge): RouteItem {
        const edges = [...this.edges.slice(0, index), edge, ...this.edges.slice(index)];
        return new RouteItem(edges, { id: this.id });
    }

    getIndex(edge: GraphEdge): number {
        return this.edges.indexOf(edge);
    }

    removeLastEdge(): RouteItem {
        if (this.edges.length === 0) { throw new Error('No edge to remove.'); }
        const clone = [...this.edges];
        clone.pop();
        const isReversedIfSingleEdge = clone.length > 0 ? this.isReversed(clone[0]) : false;
        return new RouteItem(clone, { id: this.id, isReversedIfSingleEdge });
    }

    removeFirstEdge() {
        if (this.edges.length === 0) { throw new Error('No edge to remove.'); }
        const clone = [...this.edges];
        clone.shift();
        const isReversedIfSingleEdge = clone.length > 0 ? this.isReversed(clone[0]) : false;
        return new RouteItem(clone, { id: this.id, isReversedIfSingleEdge });
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