import { AbstractMesh, Axis, Space } from "babylonjs";
import { WorldProvider } from "../../../../services/WorldProvider";
import { AssetContainerStore } from "../../../../stores/AssetContainerStore";
import { MeshInstance } from "../../objs/MeshInstance";
import { MeshObj } from "../../objs/MeshObj";
import { WorldObj } from "../../objs/WorldObj";
import { AbstractPropertyParser } from "../AbstractPropertyParser";

export class ModelPropertyParser extends AbstractPropertyParser {
    private worldObj: WorldObj;
    private assetContainerStore: AssetContainerStore;
    private worldProvider: WorldProvider;

    constructor(worldObj: WorldObj, worldProvider: WorldProvider, assetContainerStore: AssetContainerStore) {
        super();
        this.worldObj = worldObj;
        this.worldProvider = worldProvider;
        this.assetContainerStore = assetContainerStore;
    }

    feature = 'Model';

    isAsync(): boolean {
        return true;
    }

    async processFeatureAsync(meshObj: MeshObj, attrs: string[]): Promise<void> {
        const [modelType, mainMeshIndex, removeRoot] = attrs;

        const result = await this.assetContainerStore.instantiate(modelType);
                
        let meshes = removeRoot ? this.removeRoot(result.meshes) : result.meshes;

        result.animationGroups.forEach(animationGroup => animationGroup.stop());

        const mainMesh = mainMeshIndex ? meshes[mainMeshIndex] : this.findMainMesh(meshes);
        const otherMeshes = meshes.filter(mesh => mesh !== mainMesh);

        meshObj.instance = new MeshInstance([mainMesh, ...otherMeshes], result.isCloned, meshObj);

        meshObj.skeleton = result.skeletons.length > 0 ? result.skeletons[0] : undefined;
        meshObj.animation.setAnimations(result.animationGroups);
        meshObj.instance.getMesh().translate(Axis.Y, 0.2, Space.WORLD);
        meshObj.instance.getMesh().parent = this.worldObj.ground;
    }

    private removeRoot(meshes: AbstractMesh[]): AbstractMesh[] {
        if (meshes[0].id.indexOf('__root__') !== -1 && meshes[0].getChildMeshes().length > 0) {
            const root = meshes[0];
            const oneChildMesh = root.getChildMeshes()[0];

            let newRoot: AbstractMesh;
            if (oneChildMesh.parent === root) {
                oneChildMesh.setParent(null);
                newRoot = <AbstractMesh> oneChildMesh;
            } else if (oneChildMesh.parent.parent === root) {
                (<AbstractMesh> oneChildMesh.parent).setParent(null);
                newRoot = <AbstractMesh> oneChildMesh.parent;
            }

            if (newRoot) {
                root.dispose();
                return [newRoot];
            }
        }

        return meshes;
    }

    private findMainMesh(meshes: AbstractMesh[]) {
        return meshes.find(mesh => mesh.getBoundingInfo().boundingBox.extendSize.x > 0) || meshes[0];
    }
}