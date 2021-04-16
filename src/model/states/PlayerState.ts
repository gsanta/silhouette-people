import { Character } from "../objs/MeshObj";
import { MeshState } from "./MeshState";

export class PlayerState extends MeshState {
    protected player: Character;

    readonly speedConst = 0.04;
    readonly rotationConst = Math.PI / 30;

    protected speed = 0;
    protected rotation = 0;

    constructor(player: Character) {
        super();
        this.player = player;

        this.enterState();
    }

    setSpeed(speed: number) {
        if (this.speed !== speed) {
            this._isDirty = true;
            this.speed = speed;
        }
    }

    getSpeed(): number {
        return this.speed;
    }

    setRotation(rotation: number) {
        if (this.rotation !== rotation) {
            this._isDirty = true;
            this.rotation = rotation;
        }
    }

    getRotation(): number {
        return this.rotation;
    }

    beforeRender(): void {}

    exitState() {
        this.player.stopCurrentAnimation();
    }

    copState(otherState: PlayerState): PlayerState {
        otherState.speed = this.speed;
        otherState.rotation = this.rotation;
        return otherState;
    }
}