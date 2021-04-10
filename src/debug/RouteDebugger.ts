import { InjectProperty } from "../di/diDecorators";
import { RouteDebuggerComponent } from "../model/components/RouteDebuggerComponent";
import { MeshObjTag } from "../model/objs/MeshObj";
import { lookup } from "../services/Lookup";
import { WorldProvider } from "../stores/WorldProvider";

export class RouteDebugger {

    @InjectProperty("WorldProvider")
    private worldProvider: WorldProvider;

    constructor() {
        this.worldProvider = lookup.worldProvider;
    }

    show() {
        const enemies = this.worldProvider.world.obj.getObjsByTag(MeshObjTag.Enemy);
        enemies.forEach(enemy => enemy.additionalComponents.push(new RouteDebuggerComponent()));
    }

    hide() {

    }
}