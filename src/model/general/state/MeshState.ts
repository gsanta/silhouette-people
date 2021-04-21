import { CharacterObj } from "../objs/CharacterObj";

export abstract class MeshState {
    protected _isDirty = false;
    protected character: CharacterObj;

    constructor(meshObj: CharacterObj) {
        this.character = meshObj;
        if (meshObj.animationState) {
            meshObj.animationState.exitState();
        }
    }

    isDirty() {
        return this._isDirty;
    }

    clearDirty() {
        this._isDirty = false;
    }

    update() {}

    enterState() {}
    exitState() {
        this.character.animation.stopCurrentAnimation();
    }
}