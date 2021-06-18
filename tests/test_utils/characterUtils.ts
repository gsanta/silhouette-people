import { Mesh, Scene, Vector3 } from "babylonjs";
import { HumanController } from "../../src/model/item/character/states/HumanController";
import { GameObject } from "../../src/model/objects/game_object/GameObject";

export class CharacterBuilder {
    private index = 0;
    private _pos: Vector3;
    private _velocity: Vector3;
    private _radius: number;
    private _collSensorDistance: number;
    private scene: Scene;

    constructor(scene: Scene) {
        this.scene = scene;
    }

    pos(x: number, y: number, z: number): CharacterBuilder {
        this._pos = new Vector3(x, y, z);
        return this;
    }

    velocity(x: number, y: number, z: number): CharacterBuilder {
        this._velocity = new Vector3(x, y, z);
        return this;
    }

    radius(r: number): CharacterBuilder {
        this._radius = r;
        return this;
    }

    collisionSensorDistance(dist: number): CharacterBuilder {
        this._collSensorDistance = dist;
        return this;
    }

    build(): GameObject {
        const character = new GameObject(`character-${this.index}`);
        const mesh = new Mesh(`character-${this.index}-mesh`, this.scene);
        character.radius = this._radius !== undefined ? this._radius : character.radius;
        character.meshes = [mesh];
        character.motionController = new HumanController(character);
        character.motionController.velocity = this._velocity;
        character.position = this._pos;
        character.collisionSensorDistance = this._collSensorDistance !== undefined ? this._collSensorDistance : character.collisionSensorDistance;

        this.index++;

        return character;
    }
}