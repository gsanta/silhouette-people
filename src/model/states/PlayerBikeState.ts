import { MeshObj } from "../objs/MeshObj";
import { AbstractMeshState, MeshStateName } from "./AbstractMeshState";

export class PlayerBikeState extends AbstractMeshState {
    constructor(gameObject: MeshObj) {
        super(MeshStateName.PlayerBikeState, gameObject);
    }

    enterState() {
        this.gameObject.runAnimation('Bicycle');
    }

    exitState() {
        this.gameObject.stopCurrentAnimation();
    }
}