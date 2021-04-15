import { MeshObj } from "../objs/MeshObj";


export class PlayerState {
    protected player: MeshObj;

    readonly speedConst = 0.04;
    readonly rotationConst = Math.PI / 30;

    protected speed = 0;
    protected rotation = 0;

    setSpeed(speed: number) {
        this.speed = speed;
    }

    getSpeed(): number {
        return this.speed;
    }

    setRotation(rotation: number) {
        this.rotation = rotation;
    }

    getRotation(): number {
        return this.rotation;
    }

    exitState() {
        this.player.stopCurrentAnimation();
    }
}