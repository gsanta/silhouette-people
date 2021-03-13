import { GameObjectRole } from "../../model/GameObject";
import { World } from "../../model/World";
import { EnemyPathDebugComponent } from "./EnemyPathDebugComponent";


export class EnemyPathDebugger {
    private world: World;

    constructor(world: World) {
        this.world = world;
    }

    show() {
        const enemies = this.world.store.getByRole(GameObjectRole.Enemy);
        enemies.forEach(enemy => enemy.miscComponents.push(new EnemyPathDebugComponent()));
    }

    hide() {

    }
}