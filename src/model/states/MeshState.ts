import { MeshObj } from "../objs/MeshObj";


export abstract class MeshState<M extends MeshObj> {
    protected _isDirty = false;
    protected meshObj: M;

    constructor(meshObj: M) {
        this.meshObj = meshObj;
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
        this.meshObj.stopCurrentAnimation();
    }
}