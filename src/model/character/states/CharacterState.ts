import { Character } from "../../general/objs/MeshObj";
import { MeshState } from "../../general/state/MeshState";

export class CharacterState extends MeshState<Character> {
    beforeRender(): void {}
}