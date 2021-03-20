import { GameObjectRole, GameObjectType } from "../../model/game_object/GameObject";
import { World } from "../../model/World";
import { RouteDebuggerComponent } from "../../model/game_object/components/RouteDebuggerComponent";


export class RouteDebugger {
    private world: World;

    constructor(world: World) {
        this.world = world;
    }

    show() {
        const enemies = this.world.store2.getByRole(GameObjectRole.Enemy);
        enemies.forEach(enemy => enemy.additionalComponents.push(new RouteDebuggerComponent()));
    }

    hide() {

    }
}