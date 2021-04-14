import { InjectProperty } from "../../di/diDecorators";
import { RouteFactory } from "../../services/factory/RouteFactory";
import { lookup } from "../../services/Lookup";
import { Route } from "../district/Route";
import { MeshObj } from "../objs/MeshObj";
import { AbstractMeshState, MeshStateName } from "./AbstractMeshState";

export class EnemyMovingState extends AbstractMeshState {
    route: Route;

    @InjectProperty("RouteFactory")
    private routeFactory: RouteFactory;

    constructor(gameObject: MeshObj) {
        super(MeshStateName.EnemyMovingState, gameObject);
        this.routeFactory = lookup.routeFactory;
    }

    beforeRender() {
        if (!this.route || this.route.isFinished) {
            this.route = this.routeFactory.createRandomRoute(this.gameObject);
        } else {
            this.route.update();
        }
    }

    enterState() {
        this.gameObject.runAnimation('Walk');
    }

    exitState() {
        this.gameObject.stopCurrentAnimation();
    }
}