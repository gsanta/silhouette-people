import { GameObjTag } from "../model/objs/GameObj";
import { World } from "../services/World";
import { AbstractController } from "./IController";

export class PlayerController extends AbstractController {
    private world: World;

    constructor(world: World) {
        super();
        this.world = world;
    }
    
    keyboard(e: KeyboardEvent) {
        switch(e.key) {
            case 'b':
                const bicycles = this.world.store.getGameObjsByTag(GameObjTag.Bicycle);
                const player = this.world.store.getGameObjsByTag(GameObjTag.Player)[0];

                const distances = bicycles.map(bicycle => bicycle.mesh.distance(player));
                distances.sort((d1, d2) => d1 - d2);

                if (distances[0] < 1.5) {
                    player.states.setDefaultState();
                    bicycles
                }
            break;
        }
    }
}