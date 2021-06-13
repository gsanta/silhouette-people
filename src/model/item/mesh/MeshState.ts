import { GameObject } from "../../objects/game_object/GameObject";

export enum MeshStateName {
    CharacterIdleState = 'CharacterIdleState',
    CharacterWalkingState = 'CharacterWalkingState',
    
    BikeIdleState = 'BikeIdleState',
    BikeMovingState = 'BikeMovingState'
}

export abstract class MeshState {
    protected _isDirty = false;
    protected character: GameObject;

    constructor(meshObj: GameObject) {
        this.character = meshObj;
        if (meshObj.stateController && meshObj.stateController.state) {
            meshObj.stateController.state.exitState();
        }
    }

    isDirty() {
        return this._isDirty;
    }

    clearDirty() {
        this._isDirty = false;
    }

    update(deltaTime: number) {}

    enterState() {}
    exitState() {
        this.character.animation.stopCurrentAnimation();
    }
}