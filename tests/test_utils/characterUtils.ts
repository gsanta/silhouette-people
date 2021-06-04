import { Mesh, Scene, Vector3 } from "babylonjs";
import { CharacterItem } from "../../src/model/item/character/CharacterItem";

export class CharacterBuilder {
    private index = 0;
    private _pos: Vector3;
    private _velocity: Vector3;
    private _radius: number;
    private scene: Scene;

    constructor(scene: Scene) {
        this.scene = scene;
    }

    pos(vec: Vector3): CharacterBuilder {
        this._pos = vec;
        return this;
    }

    velocity(vec: Vector3): CharacterBuilder {
        this._velocity = vec;
        return this;
    }

    radius(r: number): CharacterBuilder {
        this._radius = r;
        return this;
    }

    build(): CharacterItem {
        const character = new CharacterItem(`character-${this.index}`);
        const mesh = new Mesh(`character-${this.index}-mesh`, this.scene);
        character.radius = this._radius !== undefined ? this._radius : character.radius;
        character.meshes = [mesh];
        character.velocity = this._velocity;
        character.position = this._pos;

        this.index++;

        return character;
    }
}

function createCharacter(position: Vector3, velocity: Vector3, scene: Scene): CharacterItem {
    const character = new CharacterItem('character-1');
    const mesh = new Mesh('character-mesh', scene);
    character.meshes = [mesh];
    character.velocity = velocity;
    character.position = position;
    return character;
}