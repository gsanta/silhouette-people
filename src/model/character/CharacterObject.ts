import { Mesh } from "babylonjs";
import { GameObject } from "../GameObject";
import { AbstractCharacterState } from "./ICharacterState";
import { IdleCharacterState } from "./IdleCharacterState";
import { MovingCharacterState } from "./MovingCharacterState";

const enum CharacterStateType {
    Idle = 'Idle',
    Walking = 'Walking'
}

export class CharacterObject extends GameObject {
    state: AbstractCharacterState;

    constructor(mesh: Mesh) {
        super(mesh);

        this.state = new IdleCharacterState();
    }
}