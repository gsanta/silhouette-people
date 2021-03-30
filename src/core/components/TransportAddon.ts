import { GameObj } from "../../model/objs/GameObj";
import { World } from "../../services/World";
import { AbstractAddon, AddonName } from "./AbstractAddon";


export class TransportAddon extends AbstractAddon {
    name: AddonName = AddonName.Transport;
    private world: World;

    constructor(world: World) {
        super();
        this.world = world;
    }

    update(gameObj: GameObj) {
        const player = this.world.store.getActiveDistrict().activeComp.getPlayer();
    }
}