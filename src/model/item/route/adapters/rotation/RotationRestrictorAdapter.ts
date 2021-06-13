import { RotationRestrictor } from "./RotationRestrictor";
import { RouteController } from "../../../../objects/game_object/controller_route/RouteController";
import { RouteControllerListener } from "../../../../objects/game_object/controller_route/RouteControllerListener";

export class RotationRestrictorAdapter extends RouteControllerListener {

    private restrictor: RotationRestrictor;

    constructor(routeWalker: RouteController) {
        super();

        this.restrictor = new RotationRestrictor(routeWalker);
    }

    onWalk() {
        this.restrictor.positionChanged();
    }

    onEnterEdge() {
        this.restrictor.edgeChanged();
    }

    onDirectionChanged() {
        this.restrictor.edgeChanged();
    }

    onStarted() {
        this.restrictor.on();
    }

    onFinished() {
        this.restrictor.off();
    }
}
