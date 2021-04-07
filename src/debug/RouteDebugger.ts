import { RouteDebuggerComponent } from "../model/components/RouteDebuggerComponent";
import { GameObjTag } from "../model/objs/GameObj";
import { World } from "../services/World";


export class RouteDebugger {
    private world: World;

    constructor(world: World) {
        this.world = world;
    }

    show() {
        const enemies = this.world.activeObj.getGameObjsByTag(GameObjTag.Enemy);
        enemies.forEach(enemy => enemy.additionalComponents.push(new RouteDebuggerComponent()));
    }

    hide() {

    }
}