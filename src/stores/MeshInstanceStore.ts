import { ISceneLoaderAsyncResult } from "babylonjs";
import { Mesh } from "babylonjs/Meshes/index";

export class MeshInstanceStore {

    private instances: Map<string, ISceneLoaderAsyncResult> = new Map();

    addInstance(name: string, result: ISceneLoaderAsyncResult) {
        this.instances.set(name, result);
    }

    hasInstance(name: string): boolean {
        return this.instances.has(name);
    }

    getInstance(name: string): ISceneLoaderAsyncResult {
        return this.instances.get(name);
    }
}