import { GameObjectRole } from "../../model/GameObject";
import { World } from "../../model/World";


export class EnemyPathDebugger {
    private world: World;

    constructor(world: World) {
        this.world = world;
    }

    show() {
        const enemies = this.world.store.getByRole(GameObjectRole.Enemy);
        enemies.forEach(enemy => enemy.miscComponents.push())
    }

    hide() {

    }
}