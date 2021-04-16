import { MeshObj } from "../objs/MeshObj";
import { Lookup } from "../../../services/Lookup";


export interface IComponent {
    update(gameObject: MeshObj, world: Lookup);
}