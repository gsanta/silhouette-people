import { CharacterItem } from "../character/CharacterItem";

export abstract class MeshState {
    protected _isDirty = false;
    protected character: CharacterItem;

    constructor(meshObj: CharacterItem) {
        this.character = meshObj;
        if (meshObj.stateController && meshObj.stateController.state) {
            meshObj.stateController.state.exitState();
        }
    }

    isDirty() {
        return this._isDirty;
    }

    clearDirty() {
        this._isDirty = false;
    }

    update(deltaTime: number) {}

    enterState() {}
    exitState() {
        this.character.animation.stopCurrentAnimation();
    }
}