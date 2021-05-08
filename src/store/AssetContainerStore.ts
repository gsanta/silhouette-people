import { AnimationGroup, AssetContainer, Axis, Quaternion, Skeleton, Vector3 } from "babylonjs";
import { InstantiatedEntries } from "babylonjs/assetContainer";
import { AbstractMesh } from "babylonjs/Meshes/index";

export interface InstantiatedAssets {
    meshes: AbstractMesh[];
    skeletons: Skeleton[];
    animationGroups: AnimationGroup[];
    isCloned: boolean;
}

export class AssetContainerStore {

    private instances: Map<string, AssetContainer> = new Map();
    private instantiated: Map<string, boolean> = new Map();
    private indexes: Map<string, number> = new Map();

    addInstance(name: string, result: AssetContainer) {
        this.instances.set(name, result);
        this.instantiated.set(name, false);
        this.indexes.set(name, 1);
    }

    hasInstance(name: string): boolean {
        return this.instances.has(name);
    }

    getInstance(name: string): AssetContainer {
        return this.instances.get(name);
    }

    instantiate(name: string, canUseOriginalInstance = true): InstantiatedAssets {
        if (!this.instantiated.get(name)) {
            const container = this.instances.get(name);
            container.addAllToScene();
            this.instantiated.set(name, true);

            if (canUseOriginalInstance) {
                return this.createInstancedAssetFromContainer(container);
            } else {
                container.meshes.forEach(mesh => mesh.isVisible = false);
            }

        } 

        const index = this.indexes.get(name);
        const entries = this.instances.get(name).instantiateModelsToScene(() => `${name}-${index}`);
        this.indexes.set(name, index + 1);

        return this.createInstantiatedAssetsFromEntries(entries);
    }

    private createInstancedAssetFromContainer(container: AssetContainer): InstantiatedAssets {
        return {
            meshes: <AbstractMesh[]> container.meshes,
            skeletons: container.skeletons,
            animationGroups: container.animationGroups,
            isCloned: false
        }
    }

    private createInstantiatedAssetsFromEntries(entries: InstantiatedEntries): InstantiatedAssets {
        entries.rootNodes.forEach((mesh: AbstractMesh) => {
            mesh.isVisible = true;
            mesh.getChildMeshes().forEach(mesh => mesh.isVisible = true);
        });

        return {
            meshes: <AbstractMesh[]> entries.rootNodes,
            skeletons: entries.skeletons,
            animationGroups: entries.animationGroups,
            isCloned: true
        }
    }
}