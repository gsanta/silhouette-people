import { RouteController } from "../../game_object/controller_route/RouteController";
import { ExactDirectionRestrictor } from "./ExactDirectionRestrictor";
import { InsidePolygonRestrictor } from "./InsidePolygonRestrictor";

export class RotationRestrictor {
    private routeWalker: RouteController;
    private lineRotationFilter: ExactDirectionRestrictor;
    private areaRotationFilter: InsidePolygonRestrictor;

    constructor(routeWalker: RouteController) {
        this.routeWalker = routeWalker;
        this.lineRotationFilter = new ExactDirectionRestrictor(this.routeWalker);
        this.areaRotationFilter = new InsidePolygonRestrictor(routeWalker);
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
            character.rotation = angle.worldAngle().rad;
        }
    }

    private setRotationFilter() {
        this.removeRotationFilter();
        
        const edge = this.routeWalker.getEdge();
        const character = this.routeWalker.getCharacter();
        const filter = edge.thickness ? this.areaRotationFilter : this.lineRotationFilter;
        character.motionController.addFilter(filter);
    }

    private removeRotationFilter() {
        const character = this.routeWalker.getCharacter();
        character.motionController.removeFilter(this.areaRotationFilter);
        character.motionController.removeFilter(this.lineRotationFilter);
    }

    on() {
        this.setRotationFilter();
    }

    off() {
        this.removeRotationFilter();
    }
}