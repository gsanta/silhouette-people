import { Vector2, Vector3 } from "babylonjs";
import { GraphEdge } from "../../../../../service/graph/GraphImpl";
import { RouteWalker } from "../../RouteWalker";

export class ActiveEdgeUpdater {
    private readonly routeWalker: RouteWalker;
    
    constructor(routeWalker: RouteWalker) {
        this.routeWalker = routeWalker;
    }

    initActiveEdge() {
        const route = this.routeWalker.getRoute();
        this.routeWalker.setEdge(route.getEdges()[0]);
        const source = this.routeWalker.getSource().p;
        this.routeWalker.getCharacter().position = new Vector3(source.x, 0, source.z);

        // this.routeWalker.getCharacter().setPosition2D(new Vector2(source.x, source.z));
    }
    
    updateActiveEdge() {
        if (this.isEdgeFinished()) {
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

    private isEdgeFinished() {
        const target = this.routeWalker.getTarget();
        const character = this.routeWalker.getCharacter();
        
        const curr = character.position;
    
        const isWithinDestRadius = target.p.subtract(curr).length() < 0.2;
        const isLeavingDest = this.isLeavingDest();
    
        return isWithinDestRadius || isLeavingDest;
    }

    private isLeavingDest() {
        const currPos = this.routeWalker.getPos();
        const prevPos = this.routeWalker.getPrevPos();
        const target = this.routeWalker.getTarget();

        if (prevPos) {
            const checkDist = prevPos.subtract(target.p).length() < 0.5;
            const checkDir = prevPos.subtract(target.p).length() < currPos.subtract(target.p).length();
            return checkDist && checkDir;
        }
        return false;
    }
}