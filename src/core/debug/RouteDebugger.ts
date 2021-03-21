import { GameObjectRole, GameObjectType } from "../../model/objs/GameObj";
import { World } from "../../model/World";
import { RouteDebuggerComponent } from "../../model/components/RouteDebuggerComponent";


export class RouteDebugger {
    private world: World;

    constructor(world: World) {
        this.world = world;
    }

    show() {
        const enemies = this.world.store.getGameObjectByRole(GameObjectRole.Enemy);
        enemies.forEach(enemy => enemy.additionalComponents.push(new RouteDebuggerComponent()));
    }

    hide() {

    }
}