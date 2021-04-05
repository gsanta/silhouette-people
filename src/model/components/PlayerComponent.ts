import { GameObj, GameObjectType } from "../objs/GameObj";

export class PlayerComponent {
    private vehicle: GameObj;

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