import { RotationRestrictor } from "./RotationRestrictor";
import { RouteController } from "../../game_object/controller_route/RouteController";
import { RouteControllerListener } from "../../game_object/controller_route/RouteControllerListener";

export class RotationRestrictorAdapter extends RouteControllerListener {

    private restrictor: RotationRestrictor;

    constructor(routeWalker: RouteController) {
        super();

        this.restrictor = new RotationRestrictor(routeWalker);
    }

    onEnterEdge() {
        this.restrictor.edgeChanged();
    }

    onDirectionChanged() {
        this.restrictor.directionChanged();
    }

    onStarted() {
        this.restrictor.on();
    }

    onFinished() {
        this.restrictor.off();
    }
}
