import { Axis, Space } from "babylonjs";
import { Character } from "../../general/objs/MeshObj";
import { MeshWalker } from "../../general/state/MeshWalker";


export class CharacterWalker extends MeshWalker {
    constructor(private character: Character) {
        super();
    }

    walk() {
        const mesh = this.character.getMesh();

        this.character.move(this.speed);
        mesh.rotate(Axis.Y, this.rotation, Space.WORLD);
    }
}