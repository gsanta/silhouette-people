import { CharacterObj } from "../objs/CharacterObj";

export abstract class MeshState {
    protected _isDirty = false;
    protected character: CharacterObj;

    constructor(meshObj: CharacterObj) {
        this.character = meshObj;
        if (meshObj.state) {
            meshObj.state.exitState();
        }
    }

    isDirty() {
        return this._isDirty;
    }

    clearDirty() {
        this._isDirty = false;
    }

    beforeRender() {}

    enterState() {}
    exitState() {
        this.character.animation.stopCurrentAnimation();
    }
}