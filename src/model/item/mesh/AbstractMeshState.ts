import { MeshItem } from "./MeshItem";

export enum MeshStateName {
    CharacterIdleState = 'CharacterIdleState',
    CharacterWalkingState = 'CharacterWalkingState',
    
    BikeIdleState = 'BikeIdleState',
    BikeMovingState = 'BikeMovingState'
}

export abstract class AbstractMeshState {
    readonly type: MeshStateName;
    protected readonly gameObject: MeshItem;

    constructor(type: MeshStateName, gameObject: MeshItem) {
        this.type = type;
        this.gameObject = gameObject;
    }

    keyboard(e: KeyboardEvent, isKeydown: boolean): void {}
    
    
    
    
    beforeRender(): void {}
    enterState() {}
    exitState() {}
}