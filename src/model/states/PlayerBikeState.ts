import { MeshObj } from "../objs/MeshObj";
import { AbstractMeshObjState, MeshObjStateName } from "./AbstractMeshObjState";

export class PlayerBikeState extends AbstractMeshObjState {
    constructor(gameObject: MeshObj) {
        super(MeshObjStateName.PlayerBikeState, gameObject);
    }

    enter() {
        this.gameObject.runAnimation('Bicycle');
    }

    exit() {
        this.gameObject.stopCurrentAnimation();
    }
}