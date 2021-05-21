import { Mesh } from "babylonjs";
import { GraphEdge } from "../../../service/graph/GraphImpl";
import { CharacterItem } from "../character/CharacterItem";
import { RouteWalker } from "./RouteWalker";

export interface RouteStoryConfig {
    routeId: string;
    characterId: string;
}

export class RouteItem {
    readonly name: string;
    character: CharacterItem;
    walker: RouteWalker;
    meshes: Mesh[] = [];

    private edges: GraphEdge[];
    private reverseEdges: GraphEdge[];
    private routeChangeHandlers: (() => void)[] = [];

    constructor(edges: GraphEdge[], name?: string, character?: CharacterItem) {
        this.character = character;
        this.edges = edges;

        this.name = name;
        this.reverseEdges = [...this.edges].reverse();
    }

    addEdge(edge: GraphEdge) {
        if (this.walker.isReversed()) {
            this.edges.unshift(edge);
        } else {
            this.edges.push(edge);
        }
        this.reverseEdges = [...this.edges].reverse();
        this.routeChangeHandlers.forEach(handler => handler());
    }

    removeLastEdge() {
        if (this.walker.isReversed()) {
            this.edges.shift();
        } else {
            this.edges.pop();
        }
        this.reverseEdges = [...this.edges].reverse();
        this.routeChangeHandlers.forEach(handler => handler());
    }

    removeFirstEdge() {
        if (this.walker.isReversed()) {
            this.edges.pop();
        } else {
            this.edges.shift();
        }
        this.reverseEdges = [...this.edges].reverse();
        this.routeChangeHandlers.forEach(handler => handler());
    }

    getEdges(): GraphEdge[] {
        return this.walker.isReversed() ? this.reverseEdges : this.edges;
    }

    onRouteChange(func: () => void) {
        this.routeChangeHandlers.push(func);
    }

    unsubscribeRouteChange(func: () => void) {
        this.routeChangeHandlers = this.routeChangeHandlers.filter(handler => handler !== func);
    }
}