import { RouteController } from "../../game_object/controller_route/RouteController";
import { MoveOnLine } from "./MoveOnLine";
import { MoveInArea } from "./MoveInArea";

export class RotationRestrictor {
    private routeWalker: RouteController;
    private moveOnLine: MoveOnLine;
    private moveInArea: MoveInArea;

    constructor(routeWalker: RouteController) {
        this.routeWalker = routeWalker;
        this.moveOnLine = new MoveOnLine(this.routeWalker);
        this.moveInArea = new MoveInArea(routeWalker);
    }

    edgeChanged() {
        this.setRotationFilter();
    }

    directionChanged() {
        const edge = this.routeWalker.getEdge();
        const route = this.routeWalker.getRoute();
        if (edge) {
            const character = this.routeWalker.getCharacter();
            const angle = route.isReversed(edge) ? edge.oppositeAngle : edge.angle;
            character.rotationY = angle.worldAngle().rad;
        }
    }

    private setRotationFilter() {
        this.removeRotationFilter();
        
        const edge = this.routeWalker.getEdge();

        if (edge) {
            const character = this.routeWalker.getCharacter();
            const filter = edge.thickness ? this.moveInArea : this.moveOnLine;
            character.motionController.addFilter(filter);
        }
    }

    private removeRotationFilter() {
        const character = this.routeWalker.getCharacter();
        character.motionController.removeFilter(this.moveInArea);
        character.motionController.removeFilter(this.moveOnLine);
    }

    on() {
        this.setRotationFilter();
    }

    off() {
        this.removeRotationFilter();
    }
}