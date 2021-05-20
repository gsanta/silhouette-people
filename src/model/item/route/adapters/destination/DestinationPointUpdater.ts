import { GraphVertex } from "../../../../../service/graph/GraphImpl";
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
        const destPoint = this.routeWalker.getDestPoint();

        const nextDestPoint = this.getNextRoutePoint(destPoint);

        if (nextDestPoint !== undefined) {
            this.routeWalker.setDestPoint(nextDestPoint, destPoint);
        } else {
            this.routeWalker.setDestPoint(undefined, destPoint);
        }
    }

    private getNextRoutePoint(currDestPoint: GraphVertex): GraphVertex {
        const routePoints = this.routeWalker.getRoute().getEdges();
        let nextRoutePoint: GraphVertex;

        if (currDestPoint === routePoints[routePoints.length - 1]) {
            nextRoutePoint = undefined;
        } else {
            nextRoutePoint = routePoints[routePoints.indexOf(currDestPoint) + 1];
        }

        return nextRoutePoint;
    }

    private isCheckPointReached() {
        const destPoint = this.routeWalker.getDestPoint();
        const route = this.routeWalker.getRoute();
        const character = route.character;
        
        const curr = character.getPosition();
    
        const isWithinDestRadius = destPoint.p.subtract(curr).length() < 0.2;
        const isLeavingDest = this.isLeavingDest();
    
        return isWithinDestRadius || isLeavingDest;
    }

    private isLeavingDest() {
        const currPos = this.routeWalker.getPos();
        const prevPos = this.routeWalker.getPrevPos();
        const destPoint = this.routeWalker.getDestPoint();

        if (prevPos) {
            const checkDist = prevPos.subtract(destPoint.p).length() < 2;
            const checkDir = prevPos.subtract(destPoint.p).length() < currPos.subtract(destPoint.p).length();
            return checkDist && checkDir;
        }
        return false;
    }
}