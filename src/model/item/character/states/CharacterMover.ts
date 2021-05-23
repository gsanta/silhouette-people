import { Axis, Space, Vector3 } from "babylonjs";
import { PersonItem } from "../CharacterItem";
import { MeshMover } from "../../mesh/MeshMover";


export class CharacterMover extends MeshMover {
    constructor(character: PersonItem) {
        super(character);
    }

    walk(deltaTime: number) {
        // this.character.instance.move(this.speed);

        const mesh = this.character.instance.getMesh();
        
        const deltaTimeSec = deltaTime / 1000;
        const displacement = this.speed * deltaTimeSec;
        const displacementVec = new Vector3(displacement, displacement, displacement);
        const forwardDir = new Vector3(0, 0, 1);
        
        var direction = mesh.getDirection(forwardDir);
        direction.normalize().multiplyInPlace(displacementVec);
        this.character.instance.moveWithCollision(direction);

        // mesh.rotate(Axis.Y, this.rotation, Space.WORLD);
    }
}