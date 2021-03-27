import { GameObjTag } from "../model/objs/GameObj";
import { IdleBikeState } from "../model/states/IdleBikeState";
import { MovingBikeState } from "../model/states/MovingBikeState";
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

                const bikeAndDist = bicycles.map(bicycle => {
                    return {
                        bike: bicycle,
                        dist: bicycle.mesh.distance(player)
                    }
                });
                bikeAndDist.sort((d1, d2) => d1.dist - d2.dist);

                if (bikeAndDist[0].dist < 1.5) {
                    const bike = bikeAndDist[0].bike;
                    player.tags.removePlayer();
                    player.states.setDefaultState();
                    bike.tags.addPlayer();
                    bike.states.currState = new MovingBikeState(bike, this.world);
                }
            break;
        }
    }
}