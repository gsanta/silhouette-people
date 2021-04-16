import { InjectProperty } from "../di/diDecorators";
import { RouteDebuggerComponent } from "../model/general/components/RouteDebuggerComponent";
import { MeshObjTag } from "../model/general/objs/MeshObj";
import { lookup } from "../services/Lookup";
import { MeshStore } from "../stores/MeshStore";

export class RouteDebugger {

    @InjectProperty("MeshStore")
    private meshStore: MeshStore;

    constructor() {
        this.meshStore = lookup.meshStore;
    }

    show() {
        const enemies = this.meshStore.getObjsByTag(MeshObjTag.Enemy);
        enemies.forEach(enemy => enemy.additionalComponents.push(new RouteDebuggerComponent()));
    }

    hide() {

    }
}