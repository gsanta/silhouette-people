import { RoutePointProvider } from "./RoutepointProvider";
import { RouteWalker } from "./RouteWalker";

export class DestinationPointUpdater {
    private readonly routeWalker: RouteWalker;
    private readonly routePointProvider: RoutePointProvider;
    
    constructor(routeWalker: RouteWalker, routePointProvider: RoutePointProvider) {
        this.routeWalker = routeWalker;
        this.routePointProvider = routePointProvider;
    }

    initCheckPoints() {
        const route = this.routeWalker.getRoute();

        const routePoints = route.getRoutePoints();
        this.routeWalker.setDestPoint(routePoints[1], routePoints[0]);
    }
    
    updateCheckPointsIfNeeded() {
        if (this.isCheckPointReached()) {
            this.setNextCheckPoint();
            return true;
        }
    }

    private setNextCheckPoint() {
        const route = this.routeWalker.getRoute();
        const character = route.character;
        const destPoint = this.routeWalker.getDestPoint();
        const prevDestPoint = this.routeWalker.getPrevDestPoint();

        const nextDestPoint = this.routePointProvider.getNextRoutePoint(destPoint, prevDestPoint);

        if (nextDestPoint === undefined) {
            this.routeWalker.setFinished(true);
        } else {
            this.routeWalker.setDestPoint(nextDestPoint, character.getPosition());
        }
    }

    private isCheckPointReached() {
        const destPoint = this.routeWalker.getDestPoint();
        const route = this.routeWalker.getRoute();
        const character = route.character;
        
        const curr = character.getPosition();
    
        const isWithinDestRadius = destPoint.subtract(curr).length() < 0.2;
        const isLeavingDest = this.isLeavingDest();
    
        return isWithinDestRadius || isLeavingDest;
    }

    private isLeavingDest() {
        const currPos = this.routeWalker.getCurrPos();
        const prevPos = this.routeWalker.getPrevPos();
        const destPoint = this.routeWalker.getDestPoint();

        if (prevPos) {
            const checkDist = prevPos.subtract(destPoint).length() < 2;
            const checkDir = prevPos.subtract(destPoint).length() < currPos.subtract(destPoint).length();
            return checkDist && checkDir;
        }
        return false;
    }
}