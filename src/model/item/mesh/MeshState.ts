import { CharacterItem } from "../character/CharacterItem";

export abstract class MeshState {
    protected _isDirty = false;
    protected character: CharacterItem;

    constructor(meshObj: CharacterItem) {
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

    update(deltaTime: number) {}

    enterState() {}
    exitState() {
        this.character.animation.stopCurrentAnimation();
    }
}