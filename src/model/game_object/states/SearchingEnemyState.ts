import { Axis, MeshBuilder, Space, Vector2, Vector3 } from "babylonjs";
import { AbstractCharacterState, GameObjectStateType } from "./AbstractCharacterState";
import { GameObject } from "../GameObject";
import { World } from "../../World";
import { Route } from "../../area/Route";

export class SearchingEnemyState extends AbstractCharacterState {
    private world: World;
    route: Route;

    constructor(gameObject: GameObject, world: World) {
        super(GameObjectStateType.EnemySearching, gameObject);
        this.world = world;
        this.route = new Route(this.gameObject, this.world);
    }

    updateAnimation() {
        this.gameObject.runAnimation('Walk');
    }

    updatePhysics() {
        if (this.route.isFinished) {
            this.route = new Route(this.gameObject, this.world);
        } else {
            this.route.update();
        }

        return undefined;
    }

    exit() {
        this.gameObject.stopCurrentAnimation();
    }
}