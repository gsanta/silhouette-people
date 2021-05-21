import { GraphEdge, GraphVertex } from "../../../../../service/graph/GraphImpl";
import { RouteWalker } from "../../RouteWalker";

export class DestinationPointUpdater {
    private readonly routeWalker: RouteWalker;
    
    constructor(routeWalker: RouteWalker) {
        this.routeWalker = routeWalker;
    }

    initCheckPoints() {
        const route = this.routeWalker.getRoute();
        this.routeWalker.setEdge(route.getEdges()[0]);
    }
    
    updateCheckPointsIfNeeded() {
        if (this.isCheckPointReached()) {
            this.setNextCheckPoint();
            return true;
        }
    }

    private setNextCheckPoint() {
        const nextEdge = this.getNextEdge();
        this.routeWalker.setEdge(nextEdge);
    }

    private getNextEdge(): GraphEdge {
        const edge = this.routeWalker.getEdge();
        const edges = this.routeWalker.getRoute().getEdges();
        let nextEdge: GraphEdge;

        if (edge === edges[edges.length - 1]) {
            nextEdge = undefined;
        } else {
            nextEdge = edges[edges.indexOf(edge) + 1];
        }

        return nextEdge;
    }

    private isCheckPointReached() {
        const target = this.routeWalker.getTarget();
        const route = this.routeWalker.getRoute();
        const character = route.character;
        
        const curr = character.getPosition();
    
        const isWithinDestRadius = target.p.subtract(curr).length() < 0.2;
        const isLeavingDest = this.isLeavingDest();
    
        return isWithinDestRadius || isLeavingDest;
    }

    private isLeavingDest() {
        const currPos = this.routeWalker.getPos();
        const prevPos = this.routeWalker.getPrevPos();
        const target = this.routeWalker.getTarget();

        if (prevPos) {
            const checkDist = prevPos.subtract(target.p).length() < 2;
            const checkDir = prevPos.subtract(target.p).length() < currPos.subtract(target.p).length();
            return checkDist && checkDir;
        }
        return false;
    }
}