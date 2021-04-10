import { SpotLight } from "babylonjs";
import { MeshObj, MeshObjType, MeshObjTag } from "../model/objs/MeshObj";
import { PlayerGetOffBikeState } from "../model/states/PlayerGetOffBikeState";
import { PlayerGetOnBikeState } from "../model/states/PlayerGetOnBikeState";
import { Lookup } from "../services/Lookup";
import { AbstractController, ControllerType } from "./IController";

export class PlayerController extends AbstractController {
    type = ControllerType.Player;
    private lookup: Lookup;

    constructor(lookup: Lookup) {
        super();
        this.lookup = lookup;
    }

    keyboard(e: KeyboardEvent) {
        const player = this.lookup.activeObj.getActivePlayer();

        switch(e.key) {
            case 'e':
                const nearestActionableObj = this.getNearestActionableObj(player);

                if (nearestActionableObj) {
                    this.activateActionable(player, nearestActionableObj);
                    this.lookup.renderGui.render(true);
                }
            break;
            case 'q':
                this.exitAction();
                this.lookup.renderGui.render(true);
            break;
        }
    }

    private exitAction() {
        const player = this.lookup.activeObj.getActivePlayer();
        player.state.setState(new PlayerGetOffBikeState(player, this.lookup));
    }

    private activateActionable(player: MeshObj, actionableObj: MeshObj) {
        switch(actionableObj.type) {
            case MeshObjType.Bicycle1:
                if (!player.player.hasBikeVechicle()) {
                    player.state.setState(new PlayerGetOnBikeState(player, actionableObj, this.lookup));
                }
            break;
        }
    }

    private getNearestActionableObj(player: MeshObj): MeshObj  {
        const bicycles = this.lookup.activeObj.getObjsByTag(MeshObjTag.Bicycle);
        const bikeAndDist = bicycles.map(bicycle => ({ bike: bicycle, dist: bicycle.mesh.distance(player)}));
        bikeAndDist.sort((d1, d2) => d1.dist - d2.dist);

        return bikeAndDist[0].dist < 1.5 ? bikeAndDist[0].bike : undefined;
    }
}