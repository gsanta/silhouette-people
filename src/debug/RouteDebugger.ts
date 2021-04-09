import { RouteDebuggerComponent } from "../model/components/RouteDebuggerComponent";
import { GameObjTag } from "../model/objs/GameObj";
import { Lookup } from "../services/Lookup";


export class RouteDebugger {
    private world: Lookup;

    constructor(world: Lookup) {
        this.world = world;
    }

    show() {
        const enemies = this.world.activeObj.getGameObjsByTag(GameObjTag.Enemy);
        enemies.forEach(enemy => enemy.additionalComponents.push(new RouteDebuggerComponent()));
    }

    hide() {

    }
}