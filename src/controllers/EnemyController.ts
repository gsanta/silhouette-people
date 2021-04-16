import { InjectProperty } from "../di/diDecorators";
import { RouteFactory } from "../services/factory/RouteFactory";
import { lookup } from "../services/Lookup";
import { MeshStore } from "../stores/MeshStore";
import { AbstractController, ControllerType } from "./IController";

export class EnemyController extends AbstractController {
    type = ControllerType.Enemy;

    @InjectProperty("MeshStore")
    private meshStore: MeshStore;

    @InjectProperty("RouteFactory")
    private routeFactory: RouteFactory;

    constructor() {
        super();
        this.meshStore = lookup.meshStore;
        this.routeFactory = lookup.routeFactory;
    }


    beforeRender() {
        const enemies = this.meshStore.getEnemies();
        
        enemies.forEach(enemy => {
            if (enemy.route && !enemy.route.isFinished) {
                enemy.route.update();
            } else {
                enemy.route = this.routeFactory.createRandomRoute(enemy);
            }
        });
    }
}