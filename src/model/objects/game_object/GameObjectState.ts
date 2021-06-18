import { GameObject } from "./GameObject";

export enum GameObjectStateName {
    CharacterIdleState = 'CharacterIdleState',
    CharacterWalkingState = 'CharacterWalkingState',
    
    BikeIdleState = 'BikeIdleState',
    BikeMovingState = 'BikeMovingState'
}

export abstract class GameObjectState {
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