import { CharacterItem } from "../character/CharacterItem";

export abstract class MeshWalker {
    protected _isDirty = false;
    protected speed = 0;
    protected rotation = 0;
    readonly character: CharacterItem;

    constructor(character: CharacterItem) {
        this.character = character;
    }

    setSpeed(speed: number) {
        if (this.speed !== speed) {
            this._isDirty = true;
            this.speed = speed;
        }
    }

    getSpeed(): number {
        return this.speed;
    }

    setRotation(rotation: number) {
        if (this.rotation !== rotation) {
            this._isDirty = true;
            this.rotation = rotation;
        }
    }

    getRotation(): number {
        return this.rotation;
    }

    abstract walk(deltaTime: number);
}