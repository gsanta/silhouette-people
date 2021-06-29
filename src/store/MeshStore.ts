import { Mesh } from "babylonjs";
import { GameObject } from "../model/objects/game_object/GameObject";


export class MeshStore {
    private map: Map<Mesh, GameObject> = new Map();
    private reverseMap: Map<GameObject, Set<Mesh>> = new Map();

    addMesh(gameObject: GameObject, mesh: Mesh) {
        this.map.set(mesh, gameObject);

        if (!this.reverseMap.has(gameObject)) {
            this.reverseMap.set(gameObject, new Set());
        }

        this.reverseMap.get(gameObject).add(mesh);
    }

    removeGameObjectMeshes(gameObject: GameObject) {
        if (this.reverseMap.has(gameObject)) {
            this.reverseMap.get(gameObject).forEach(mesh => this.map.delete(mesh));
            this.reverseMap.delete(gameObject);
        }
    }

    getGameObject(mesh: Mesh): GameObject {
        return this.map.get(mesh);
    }
}