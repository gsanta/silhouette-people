import { InjectProperty } from "../../di/diDecorators";
import { RouteFactory } from "../../services/factory/RouteFactory";
import { lookup } from "../../services/Lookup";
import { Route } from "../district/Route";
import { MeshObj } from "../objs/MeshObj";
import { AbstractMeshObjState, MeshObjStateName } from "./AbstractMeshObjState";

export class EnemyMovingState extends AbstractMeshObjState {
    route: Route;

    @InjectProperty("RouteFactory")
    private routeFactory: RouteFactory;

    constructor(gameObject: MeshObj) {
        super(MeshObjStateName.EnemyMovingState, gameObject);
        this.routeFactory = lookup.routeFactory;
    }

    update() {
        if (!this.route || this.route.isFinished) {
            this.route = this.routeFactory.createRandomRoute(this.gameObject);
        } else {
            this.route.update();
        }
    }

    enter() {
        this.gameObject.runAnimation('Walk');
    }

    exit() {
        this.gameObject.stopCurrentAnimation();
    }
}