import { InjectProperty } from "../../di/diDecorators";
import { lookup } from "../../services/Lookup";
import { MeshStore } from "../../stores/MeshStore";
import { AddonName } from "../addons/AbstractAddon";
import { Bike, MeshObj, MeshObjType, Character } from "../objs/MeshObj";
import { WorldObj } from "../objs/WorldObj";
import { PlayerIdleState } from "../states/PlayerIdleState";

export class PlayerComponent {

    @InjectProperty("MeshStore")
    private meshStore: MeshStore;

    private bike: Bike;
    private _isActive = false;
    private worldObj: WorldObj;
    private player: Character;

    constructor(player: Character, worldObj: WorldObj) {
        this.player = player;
        this.worldObj = worldObj;
        this.meshStore = lookup.meshStore;
    }

    setActive(isActive: boolean) {
        if (isActive) {
            const players = this.meshStore.getObjsByType(MeshObjType.Player);
            const activePlayer = players.find(player => player.player.isActive());

            if (activePlayer && activePlayer !== this.player) {
                const highlightAddon = activePlayer.addon.getByName(AddonName.Highlight);
                activePlayer.addon.remove(highlightAddon);
                this.player.addon.add(highlightAddon);
            }

            const otherPlayers = players.filter(player => player !== this.player);
            otherPlayers.forEach(player => player.player.setActive(false));
        } else {
            this.player.state = new PlayerIdleState(this.player);
        }

        this._isActive = isActive;
    }

    isActive() {
        return this._isActive;
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