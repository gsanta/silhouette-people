import { RouteWalkerListener } from "../../RouteWalkerListener";
import { IRouter } from "./IRouter";

export class RouterAdapter extends RouteWalkerListener {
    private readonly router: IRouter;

    constructor(router: IRouter) {
        super();

        this.router = router;
    }

    onEnterEdge() {
        this.router.edgeChanged();
    }
}
