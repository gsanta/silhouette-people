import { RouteControllerListener } from "../../../../objects/game_object/controller_route/RouteControllerListener";
import { IRouter } from "./IRouter";

export class RouterAdapter extends RouteControllerListener {
    private readonly router: IRouter;

    constructor(router: IRouter) {
        super();

        this.router = router;
    }

    onEnterEdge() {
        this.router.edgeChanged();
    }
}
