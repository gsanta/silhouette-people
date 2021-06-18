import { rotToVec } from "../../../../helpers";
import { RouteController } from "../../game_object/controller_route/RouteController";
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

    update(deltaTime: number) {
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
            const angle = route.isReversed(edge) ? edge.oppositeAngle : edge.angle;
            character.motionController.velocity = angle.worldAngle().toVector3();
        }
    }

    directionChanged() {
        const edge = this.routeWalker.getEdge();
        const route = this.routeWalker.getRoute();
        if (edge) {
            const character = this.routeWalker.getCharacter();
            const angle = route.isReversed(edge) ? edge.oppositeAngle : edge.angle;
            character.rotation = angle.worldAngle().rad;
        }
    }

    private getDirectionIfRestricted(deltaTime: number): number | null {
        const edge = this.routeWalker.getEdge();
        return edge.thickness ? this.insidePolygonRestrictor.update(deltaTime) : this.exactDirectionRestrictor.restrict(edge);
    }

    private restrictToDirection(direction: number) {
        const character = this.routeWalker.getCharacter();
        // character.instance.setRotation(direction);
        character.motionController.velocity = rotToVec(direction);
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