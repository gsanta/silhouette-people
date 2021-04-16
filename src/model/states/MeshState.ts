

export abstract class MeshState {
    protected _isDirty = false;

    isDirty() {
        return this._isDirty;
    }

    clearDirty() {
        this._isDirty = false;
    }

    enterState() {}
    exitState() {}
}