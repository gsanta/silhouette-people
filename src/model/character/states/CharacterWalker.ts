import { Axis, Space } from "babylonjs";
import { HumanoidObj } from "../../general/objs/CharacterObj";
import { MeshWalker } from "../../general/state/MeshWalker";


export class CharacterWalker extends MeshWalker {
    constructor(character: HumanoidObj) {
        super(character);
    }

    walk() {
        const mesh = this.character.instance.getMesh();

        this.character.move(this.speed);
        mesh.rotate(Axis.Y, this.rotation, Space.WORLD);
    }
}