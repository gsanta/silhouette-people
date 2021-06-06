import { Mesh } from "babylonjs";
import { MeshAttachment } from "../MeshAttachment";


export class AvoidanceRadiusAttachment extends MeshAttachment {
    private _mesh: Mesh;

    onItemPositionChanged() {
        if (this._mesh) {
            this._mesh.setAbsolutePosition(this.meshItem.position);
        }
    }

    set mesh(mesh: Mesh) {
        this._mesh = mesh;
    }
}