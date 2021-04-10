import { GameObj, GameObjectType } from "../objs/GameObj";
import { WorldObj } from "../objs/WorldObj";

export class PlayerComponent {
    private vehicle: GameObj;
    private _isActive = false;
    private worldObj: WorldObj;
    private player: GameObj;

    constructor(gameObj: GameObj, worldObj: WorldObj) {
        this.player = gameObj;
        this.worldObj = worldObj;
    }

    setActive(isActive: boolean) {
        if (isActive) {
            const players = this.worldObj.obj.getGameObjsByType(GameObjectType.Player);
            const otherPlayers = players.filter(player => player !== this.player);
            otherPlayers.forEach(player => player.player.setActive(false));
        }
        this._isActive = isActive;
    }

    isActive() {
        return this._isActive;
    }

    setVehicle(vehicle: GameObj) {
        this.vehicle = vehicle;
    }

    getVehicle() {
        return this.vehicle;
    }

    hasBikeVechicle() {
        return this.vehicle && this.vehicle.type === GameObjectType.Bicycle1;
    }
}