import { Route } from "../district/Route";
import { World } from "../../services/World";
import { GameObj } from "../objs/GameObj";
import { AbstractGameObjState, GameObjStateName } from "./AbstractGameObjState";

export class EnemyMovingState extends AbstractGameObjState {
    private world: World;
    route: Route;

    constructor(gameObject: GameObj, world: World) {
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