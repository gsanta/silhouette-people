import { MeshObj } from "../objs/MeshObj";

export enum MeshObjStateName {
    PlayerIdleState = 'PlayerIdleState',
    PlayerMovingState = 'PlayerMovingState',
    PlayerBikeState = 'PlayerBikeState',
    PlayerGetOnBikeState = 'PlayerGetOnBikeState',
    
    EnemyMovingState = 'EnemyMovingState',
    EnemyIdleState = 'EnemyIdleState',
    BikeIdleState = 'BikeIdleState',
    BikeMovingState = 'BikeMovingState'
}

export abstract class AbstractMeshObjState {
    readonly type: MeshObjStateName;
    protected readonly gameObject: MeshObj;

    constructor(type: MeshObjStateName, gameObject: MeshObj) {
        this.type = type;
        this.gameObject = gameObject;
    }

    keyboard(e: KeyboardEvent, isKeydown: boolean): void {}
    update(): void {}

    enter() {}
    exit() {}
}