import { Mesh } from "babylonjs";
import { GameObject } from "../model/objects/game_object/GameObject";


export class MeshStore {
    private map: Map<Mesh, GameObject> = new Map();

    addMesh(gameObject: GameObject, mesh: Mesh) {
        this.map.set(mesh, gameObject);
    }

    getGameObject(mesh: Mesh): GameObject {
        return this.map.get(mesh);
    }
}