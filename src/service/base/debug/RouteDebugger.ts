import { InjectProperty } from "../../../di/diDecorators";
import { RouteDebuggerComponent } from "../../../model/RouteDebuggerComponent";
import { DebugService } from "./DebugService";
import { lookup } from "../../Lookup";
import { MeshStore } from "../../../store/MeshStore";

export class RouteDebugger {

    @InjectProperty("MeshStore")
    private meshStore: MeshStore;

    private debugService: DebugService;

    private routeDebuggerComponent: RouteDebuggerComponent;

    constructor(debugService: DebugService) {
        this.debugService = debugService;
        this.meshStore = lookup.meshStore;
    }

    show() {
        const enemy = this.meshStore.getEnemies()[0];
        if (enemy) {
            this.routeDebuggerComponent = new RouteDebuggerComponent(enemy, this.debugService);
        }
    }

    hide() {
        this.routeDebuggerComponent = undefined;
    }

    beforeRender() {
        if (this.routeDebuggerComponent) {
            this.routeDebuggerComponent.update();
        }
    }
}