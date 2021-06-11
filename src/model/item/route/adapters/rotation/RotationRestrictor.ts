import { rotToVec } from "../../../../../helpers";
import { RouteWalker } from "../../RouteWalker";
import { ExactDirectionRestrictor } from "./ExactDirectionRestrictor";
import { InsidePolygonRestrictor } from "./InsidePolygonRestrictor";

export class RotationRestrictor {
    private routeWalker: RouteWalker;
    private exactDirectionRestrictor: ExactDirectionRestrictor;
    private insidePolygonRestrictor: InsidePolygonRestrictor;

    constructor(routeWalker: RouteWalker) {
        this.routeWalker = routeWalker;
        this.exactDirectionRestrictor = new ExactDirectionRestrictor(this.routeWalker);
        this.insidePolygonRestrictor = new InsidePolygonRestrictor(routeWalker);
    }

    positionChanged() {
        if (this.routeWalker.isRunning()) {

            const direction = this.getDirectionIfRestricted();

            if (direction !== null) {
                this.restrictToDirection(direction)
            } else {
                this.routeWalker.getCharacter().inputManager.enableDirection();
            }
        }
    }

    edgeChanged() {
        const edge = this.routeWalker.getEdge();
        const route = this.routeWalker.getRoute();
        if (edge) {
            const character = this.routeWalker.getCharacter();
            const initialAngle = route.isReversed(edge) ? edge.oppositeAngle : edge.angle;
            character.velocity = initialAngle.worldAngle().toVector3();
        }
    }

    private getDirectionIfRestricted(): number | null {
        const edge = this.routeWalker.getEdge();
        return edge.thickness ? this.insidePolygonRestrictor.restrict(edge) : this.exactDirectionRestrictor.restrict(edge);
    }

    private restrictToDirection(direction: number) {
        const character = this.routeWalker.getCharacter();
        // character.instance.setRotation(direction);
        character.velocity = rotToVec(direction);
        character.inputManager.disableDirection();
    }

    on() {
        const character = this.routeWalker.getCharacter();
        if (character && character.inputManager) {
            character.inputManager.disableDirection();
        }
    }

    off() {
        const character = this.routeWalker.getCharacter();
        if (character && character.inputManager) {
            character.inputManager.enableDirection();
        }
    }
}