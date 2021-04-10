import { Lookup } from "../../services/Lookup";
import { AddonName } from "../addons/AbstractAddon";
import { MeshObj, MeshObjType } from "../objs/MeshObj";
import { WorldObj } from "../objs/WorldObj";
import { PlayerIdleState } from "../states/PlayerIdleState";

export class PlayerComponent {
    private vehicle: MeshObj;
    private _isActive = false;
    private worldObj: WorldObj;
    private player: MeshObj;
    private lookup: Lookup;

    constructor(meshObj: MeshObj, worldObj: WorldObj, lookup: Lookup) {
        this.player = meshObj;
        this.worldObj = worldObj;
        this.lookup = lookup;
    }

    setActive(isActive: boolean) {
        if (isActive) {
            const players = this.worldObj.obj.getObjsByType(MeshObjType.Player);
            const activePlayer = players.find(player => player.player.isActive());

            if (activePlayer && activePlayer !== this.player) {
                const highlightAddon = activePlayer.addon.getByName(AddonName.Highlight);
                activePlayer.addon.remove(highlightAddon);
                this.player.addon.add(highlightAddon);
            }

            const otherPlayers = players.filter(player => player !== this.player);
            otherPlayers.forEach(player => player.player.setActive(false));
        } else {
            this.player.state.setState(new PlayerIdleState(this.player));
        }

        this._isActive = isActive;
    }

    isActive() {
        return this._isActive;
    }

    setVehicle(vehicle: MeshObj) {
        this.vehicle = vehicle;
    }

    getVehicle() {
        return this.vehicle;
    }

    hasBikeVechicle() {
        return this.vehicle && this.vehicle.type === MeshObjType.Bicycle1;
    }
}