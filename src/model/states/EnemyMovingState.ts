import { Route } from "../district/Route";
import { Lookup } from "../../services/Lookup";
import { GameObj } from "../objs/GameObj";
import { AbstractGameObjState, GameObjStateName } from "./AbstractGameObjState";

export class EnemyMovingState extends AbstractGameObjState {
    private world: Lookup;
    route: Route;

    constructor(gameObject: GameObj, world: Lookup) {
        super(GameObjStateName.EnemyMovingState, gameObject);
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