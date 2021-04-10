import { Route } from "../district/Route";
import { Lookup } from "../../services/Lookup";
import { MeshObj } from "../objs/MeshObj";
import { AbstractMeshObjState, MeshObjStateName } from "./AbstractMeshObjState";

export class EnemyMovingState extends AbstractMeshObjState {
    private world: Lookup;
    route: Route;

    constructor(gameObject: MeshObj, world: Lookup) {
        super(MeshObjStateName.EnemyMovingState, gameObject);
        this.world = world;
    }

    update() {
        if (!this.route || this.route.isFinished) {
            this.route = this.world.factory.route.createRandomRoute(this.gameObject);
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