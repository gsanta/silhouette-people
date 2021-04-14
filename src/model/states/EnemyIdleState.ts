import { AbstractMeshState, MeshStateName } from "./AbstractMeshState";
import { MeshObj } from "../objs/MeshObj";

export class EnemyIdleState extends AbstractMeshState {

    constructor(gameObject: MeshObj) {
        super(MeshStateName.EnemyIdleState, gameObject);
    }

    enterState() {
        this.gameObject.runAnimation('Idle');
    }

    exitState() {
        this.gameObject.stopCurrentAnimation();
    }
}