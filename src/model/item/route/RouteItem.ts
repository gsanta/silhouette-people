import { toVector2 } from "../../../helpers";
import { GraphEdge } from "../../../service/graph/GraphEdge";
import { GraphVertex } from "../../../service/graph/GraphImpl";
import { LineEquation } from "../../math/LineEquation";

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
    private borderLines: LineEquation[];

    constructor(edges: GraphEdge[], config?: RouteItemConfig) {
        this.edges = edges;
        this.setIsReversedList(config ? config.isReversedIfSingleEdge : false);
        this.setBorderLines();
        this.id = config ? config.id : undefined;
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

    getBorderLine(edge: GraphEdge): LineEquation {
        const index = this.getIndex(edge);
        return this.borderLines[index];
    }

    removeLastEdge(): RouteItem {
        if (this.edges.length === 0) { throw new Error('No edge to remove.'); }
        const clone = [...this.edges];
        clone.pop();
        const isReversedIfSingleEdge = clone.length > 0 ? this.isReversed(clone[0]) : false;
        return new RouteItem(clone, { id: this.id, isReversedIfSingleEdge });
    }

    removeFirstEdge(): RouteItem {
        if (this.edges.length === 0) { throw new Error('No edge to remove.'); }
        const clone = [...this.edges];
        clone.shift();
        const isReversedIfSingleEdge = clone.length > 0 ? this.isReversed(clone[0]) : false;
        return new RouteItem(clone, { id: this.id, isReversedIfSingleEdge });
    }

    replaceEdge(edge: GraphEdge, ...newEdges: GraphEdge[]): RouteItem {
        const clone = [...this.edges];
        clone.splice(clone.indexOf(edge), 1, ...newEdges);
        const isReversedIfSingleEdge = clone.length > 0 ? this.isReversed(clone[0]) : false;
        return new RouteItem(clone, { id: this.id, isReversedIfSingleEdge });
    }

    getEdges(): GraphEdge[] {
        return this.edges;
    }

    getEdge(index: number): GraphEdge {
        return this.edges[index];
    }

    get lastVertex() {
        const lastEdge = this.edges[this.edges.length - 1];
        return this.isReversed(lastEdge) ? lastEdge.v1 : lastEdge.v2;
    }

    get firstEdge() {
        return this.edges[0];
    }

    get lastEdge() {
        return this.edges[this.edges.length - 1];
    }

    private setIsReversedList(isReversedIfSingleEdge: boolean = false): void {
        const edges = this.edges;

        if (edges.length === 0) { return; }
        if (edges.length === 1) { 
            this.isReversedList = [isReversedIfSingleEdge]; 
            return;
        }

        const isFirstReversed = edges[1].hasVertex(edges[0].v1) ? true : false;
        const isReversedList: boolean[] = [ isFirstReversed ];

        for (let i = 1; i < this.edges.length; i++) {
            const isReversed = edges[i - 1].hasVertex(edges[i].v2) ? true : false;
            isReversedList.push(isReversed);
        }

        this.isReversedList = isReversedList;
    }

    private setBorderLines() {
        this.borderLines = this.edges.map(edge => {
            const p1 = toVector2(edge.v1.p);
            const p2 = toVector2(edge.v2.p);

            if (this.isReversed(edge)) {
                const lineEq = LineEquation.TwoPoints(p2, p1);
                return lineEq.getPerpendicularLine(p1);
            } else {
                const lineEq = LineEquation.TwoPoints(p1, p2);
                return lineEq.getPerpendicularLine(p2);
            }
        });
    }
}