import { GameObj } from "../../model/objs/GameObj";
import { World } from "../../services/World";
import { AbstractAddon, AddonName } from "./AbstractAddon";


export class TransportAddon extends AbstractAddon {
    name: AddonName = AddonName.Transport;
    private world: World;
    private gameObj: GameObj;
    private targetDistrict: string;
    private targetLocation: number;

    constructor(gameObj: GameObj, targetDistrict: string, targetLocation: number, world: World) {
        super();
        this.targetDistrict = targetDistrict;
        this.targetLocation = targetLocation;
        this.world = world;
        this.gameObj = gameObj;
    }

    update(gameObj: GameObj) {
        const player = this.world.districtStore.getPlayer();

        if (this.gameObj.district.activeComp && gameObj.getMesh().intersectsMesh(player.getMesh())) {
            this.gameObj.district.activatorComp.deactivate();
            this.world.districtStore.getDistrict(this.targetDistrict).cameraLocation = this.targetLocation;
            this.world.loader.loadDistrict(this.targetDistrict);
        }
    }
}