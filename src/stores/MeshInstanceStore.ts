import { Mesh } from "babylonjs/Meshes/index";

export class MeshInstanceStore {

    private instances: Map<string, Mesh> = new Map();

    addInstance(name: string, mesh: Mesh) {
        this.instances.set(name, mesh);
    }

    getInstance(name: string) {
        return this.instances.get(name);
    }
}