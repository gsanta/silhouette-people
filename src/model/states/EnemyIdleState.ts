import { AbstractMeshObjState, MeshObjStateName } from "./AbstractMeshObjState";
import { MeshObj } from "../objs/MeshObj";

export class EnemyIdleState extends AbstractMeshObjState {

    constructor(gameObject: MeshObj) {
        super(MeshObjStateName.EnemyIdleState, gameObject);
    }

    enter() {
        this.gameObject.runAnimation('Idle');
    }

    exit() {
        this.gameObject.stopCurrentAnimation();
    }
}