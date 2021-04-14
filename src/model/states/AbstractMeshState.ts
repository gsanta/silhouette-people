import { MeshObj } from "../objs/MeshObj";

export enum MeshStateName {
    PlayerIdleState = 'PlayerIdleState',
    PlayerMovingState = 'PlayerMovingState',
    PlayerBikeState = 'PlayerBikeState',
    PlayerGetOnBikeState = 'PlayerGetOnBikeState',
    
    EnemyMovingState = 'EnemyMovingState',
    EnemyIdleState = 'EnemyIdleState',
    BikeIdleState = 'BikeIdleState',
    BikeMovingState = 'BikeMovingState'
}

export abstract class AbstractMeshState {
    readonly type: MeshStateName;
    protected readonly gameObject: MeshObj;

    constructor(type: MeshStateName, gameObject: MeshObj) {
        this.type = type;
        this.gameObject = gameObject;
    }

    keyboard(e: KeyboardEvent, isKeydown: boolean): void {}
    
    
    
    
    beforeRender(): void {}
    enterState() {}
    exitState() {}
}