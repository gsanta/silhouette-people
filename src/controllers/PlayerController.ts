import { SpotLight } from "babylonjs";
import { MeshObj, MeshObjType, MeshObjTag } from "../model/objs/MeshObj";
import { PlayerGetOffBikeState } from "../model/states/PlayerGetOffBikeState";
import { PlayerGetOnBikeState } from "../model/states/PlayerGetOnBikeState";
import { Lookup } from "../services/Lookup";
import { AbstractController } from "./IController";

export class PlayerController extends AbstractController {
    private world: Lookup;

    constructor(world: Lookup) {
        super();
        this.world = world;
    }

    keyboard(e: KeyboardEvent) {
        const player = this.world.activeObj.getActivePlayer();

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
        const player = this.world.activeObj.getActivePlayer();
        player.state.setState(new PlayerGetOffBikeState(player, this.world));
    }

    private activateActionable(player: MeshObj, actionableObj: MeshObj) {
        switch(actionableObj.type) {
            case MeshObjType.Bicycle1:
                if (!player.player.hasBikeVechicle()) {
                    player.state.setState(new PlayerGetOnBikeState(player, actionableObj, this.world));
                }
            break;
        }
    }

    private getNearestActionableObj(player: MeshObj): MeshObj  {
        const bicycles = this.world.activeObj.getObjsByTag(MeshObjTag.Bicycle);
        const bikeAndDist = bicycles.map(bicycle => ({ bike: bicycle, dist: bicycle.mesh.distance(player)}));
        bikeAndDist.sort((d1, d2) => d1.dist - d2.dist);

        return bikeAndDist[0].dist < 1.5 ? bikeAndDist[0].bike : undefined;
    }
}