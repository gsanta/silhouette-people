import { Vector2 } from "babylonjs/Maths/math.vector";
import { GameObj } from "../objs/GameObj";


export class DrivingCharacterState {
    private traction = new Vector2(1, 1);
    private dragConst = new Vector2(0.2, 0.2);
    private mass = 10;
    private velocity: Vector2 = new Vector2(0, 0);

    private gameObj: GameObj;

    constructor(gameObj: GameObj) {
        this.gameObj = gameObj;
    }

    private getForce(): Vector2 {
        const tractiveForce = this.getTractiveForce();
        const dragForce = this.getDragForce();

        return tractiveForce.add(dragForce);
    }

    private getDragForce(): Vector2 {
        const speed = this.velocity.length();
        const speedVec = new Vector2(speed, speed);
        return this.velocity.multiply(this.dragConst).multiply(speedVec).negate();
    }

    private getTractiveForce(): Vector2 {
        return this.gameObj.getFrontDirection2D().multiply(this.traction);
    }
}