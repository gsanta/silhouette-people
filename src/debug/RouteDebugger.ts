import { RouteDebuggerComponent } from "../model/components/RouteDebuggerComponent";
import { MeshObjTag } from "../model/objs/MeshObj";
import { Lookup } from "../services/Lookup";


export class RouteDebugger {
    private world: Lookup;

    constructor(world: Lookup) {
        this.world = world;
    }

    show() {
        const enemies = this.world.activeObj.getObjsByTag(MeshObjTag.Enemy);
        enemies.forEach(enemy => enemy.additionalComponents.push(new RouteDebuggerComponent()));
    }

    hide() {

    }
}