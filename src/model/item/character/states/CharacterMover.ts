import { Axis, Space } from "babylonjs";
import { PersonItem } from "../CharacterItem";
import { MeshMover } from "../../mesh/MeshMover";


export class CharacterMover extends MeshMover {
    constructor(character: PersonItem) {
        super(character);
    }

    walk() {
        const mesh = this.character.instance.getMesh();

        this.character.instance.move(this.speed);
        mesh.rotate(Axis.Y, this.rotation, Space.WORLD);
    }
}