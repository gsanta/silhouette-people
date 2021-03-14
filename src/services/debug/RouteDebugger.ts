import { GameObjectRole } from "../../model/game_object/GameObject";
import { World } from "../../model/World";
import { RouteDebuggerComponent } from "../../model/game_object/components/RouteDebuggerComponent";


export class RouteDebugger {
    private world: World;

    constructor(world: World) {
        this.world = world;
    }

    show() {
        const enemies = this.world.store.getByRole(GameObjectRole.Enemy);
        enemies.forEach(enemy => enemy.miscComponents.push(new RouteDebuggerComponent()));
    }

    hide() {

    }
}