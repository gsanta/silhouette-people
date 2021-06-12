import { rotToVec } from "../../../../../helpers";
import { RouteController } from "../../RouteController";
import { ExactDirectionRestrictor } from "./ExactDirectionRestrictor";
import { InsidePolygonRestrictor } from "./InsidePolygonRestrictor";

export class RotationRestrictor {
    private routeWalker: RouteController;
    private exactDirectionRestrictor: ExactDirectionRestrictor;
    private insidePolygonRestrictor: InsidePolygonRestrictor;

    constructor(routeWalker: RouteController) {
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
                this.routeWalker.getCharacter().inputController.enableDirection();
            }
        }
    }

    edgeChanged() {
        const edge = this.routeWalker.getEdge();
        const route = this.routeWalker.getRoute();
        if (edge) {
            const character = this.routeWalker.getCharacter();
            const initialAngle = route.isReversed(edge) ? edge.oppositeAngle : edge.angle;
            character.characterController.velocity = initialAngle.worldAngle().toVector3();
        }
    }

    private getDirectionIfRestricted(): number | null {
        const edge = this.routeWalker.getEdge();
        return edge.thickness ? this.insidePolygonRestrictor.restrict(edge) : this.exactDirectionRestrictor.restrict(edge);
    }

    private restrictToDirection(direction: number) {
        const character = this.routeWalker.getCharacter();
        // character.instance.setRotation(direction);
        character.characterController.velocity = rotToVec(direction);
        character.inputController.disableDirection();
    }

    on() {
        const character = this.routeWalker.getCharacter();
        if (character && character.inputController) {
            character.inputController.disableDirection();
        }
    }

    off() {
        const character = this.routeWalker.getCharacter();
        if (character && character.inputController) {
            character.inputController.enableDirection();
        }
    }
}