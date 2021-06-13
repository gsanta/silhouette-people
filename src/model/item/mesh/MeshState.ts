import { MeshItem } from "./MeshItem";

export abstract class MeshState {
    protected _isDirty = false;
    protected character: MeshItem;

    constructor(meshObj: MeshItem) {
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