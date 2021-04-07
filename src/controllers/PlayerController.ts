import { SpotLight } from "babylonjs";
import { GameObj, GameObjectType, GameObjTag } from "../model/objs/GameObj";
import { PlayerGetOffBikeState } from "../model/states/PlayerGetOffBikeState";
import { PlayerGetOnBikeState } from "../model/states/PlayerGetOnBikeState";
import { World } from "../services/World";
import { AbstractController } from "./IController";

export class PlayerController extends AbstractController {
    private world: World;

    constructor(world: World) {
        super();
        this.world = world;
    }

    keyboard(e: KeyboardEvent) {
        const player = this.world.districtStore.getPlayer();

        switch(e.key) {
            case 'e':
                const nearestActionableObj = this.getNearestActionableObj(player);

                if (nearestActionableObj) {
                    this.activateActionable(player, nearestActionableObj);
                    this.world.gui.renderGui(true);
                }
            break;
            case 'q':
                this.exitAction();
                this.world.gui.renderGui(true);
            break;
        }
    }

    private exitAction() {
        const player = this.world.districtStore.getPlayer();
        player.state.setState(new PlayerGetOffBikeState(player, this.world));
    }

    private activateActionable(player: GameObj, actionableObj: GameObj) {
        switch(actionableObj.type) {
            case GameObjectType.Bicycle1:
                player.state.setState(new PlayerGetOnBikeState(player, actionableObj, this.world));
            break;
        }
    }

    private getNearestActionableObj(player: GameObj): GameObj  {
        const bicycles = this.world.districtStore.getGameObjsByTag(GameObjTag.Bicycle);
        const bikeAndDist = bicycles.map(bicycle => ({ bike: bicycle, dist: bicycle.mesh.distance(player)}));
        bikeAndDist.sort((d1, d2) => d1.dist - d2.dist);

        return bikeAndDist[0].dist < 1.5 ? bikeAndDist[0].bike : undefined;
    }
}