import { InjectProperty } from "../../../di/diDecorators";
import { lookup } from "../../../services/Lookup";
import { MeshStore } from "../../../stores/MeshStore";
import { Bike, Character, MeshObjType } from "../objs/MeshObj";
import { WorldObj } from "../objs/WorldObj";

export class PlayerComponent {

    @InjectProperty("MeshStore")
    private meshStore: MeshStore;

    private bike: Bike;
    private worldObj: WorldObj;
    private player: Character;

    constructor(player: Character, worldObj: WorldObj) {
        this.player = player;
        this.worldObj = worldObj;
        this.meshStore = lookup.meshStore;
    }

    setVehicle(bike: Bike) {
        this.bike = bike;
    }

    getBike(): Bike {
        return this.bike;
    }

    hasBikeVechicle() {
        return this.bike && this.bike.type === MeshObjType.Bicycle1;
    }
}