import { MeshObj } from "./MeshObj";

export enum MeshStateName {
    CharacterIdleState = 'CharacterIdleState',
    CharacterWalkingState = 'CharacterWalkingState',
    
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