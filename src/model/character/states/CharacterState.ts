import { Character } from "../../general/objs/MeshObj";
import { MeshState } from "../../general/state/MeshState";

export class CharacterState extends MeshState<Character> {
    readonly speedConst = 0.04;
    readonly rotationConst = Math.PI / 30;

    protected speed = 0;
    protected rotation = 0;

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

    copState(otherState: CharacterState): CharacterState {
        otherState.speed = this.speed;
        otherState.rotation = this.rotation;
        return otherState;
    }
}