import { AbstractController } from "../controllers/IController";
import { InjectProperty } from "../di/diDecorators";
import { RouteDebuggerComponent } from "../model/general/components/RouteDebuggerComponent";
import { DebugService } from "../services/DebugService";
import { lookup } from "../services/Lookup";
import { MeshStore } from "../stores/MeshStore";

export class RouteDebugger extends AbstractController {

    @InjectProperty("MeshStore")
    private meshStore: MeshStore;

    private debugService: DebugService;

    private routeDebuggerComponent: RouteDebuggerComponent;

    constructor(debugService: DebugService) {
        super();
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