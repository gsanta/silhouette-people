import { AbstractMesh, Axis, Mesh, Space } from "babylonjs";
import { MeshInstance } from "../../../../model/item/mesh/MeshInstance";
import { MeshItem } from "../../../../model/item/mesh/MeshItem";
import { AssetContainerStore } from "../../../../store/AssetContainerStore";
import { WorldProvider } from "../../../WorldProvider";
import { AbstractPropertyParser } from "../AbstractPropertyParser";

export interface ModelPropertyConfig {
    path: string;
    mainMeshIndex?: number;
    canUseOriginalInstance?: boolean;
    removeRoot?: boolean;
}

export class ModelPropertyParser extends AbstractPropertyParser<ModelPropertyConfig> {
    propName = 'model';

    private assetContainerStore: AssetContainerStore;
    private worldProvider: WorldProvider;

    constructor(worldProvider: WorldProvider, assetContainerStore: AssetContainerStore) {
        super();
        this.worldProvider = worldProvider;
        this.assetContainerStore = assetContainerStore;
    }


    isAsync(): boolean {
        return true;
    }

    async processPropertyAsync(meshObj: MeshItem, props: ModelPropertyConfig): Promise<void> {
        const removeRoot = props.removeRoot;
        // TODO for static objects there is a problem when using original instances, check it
        const canUseOriginalInstance = props.canUseOriginalInstance === false ? false : true

        const result = await this.assetContainerStore.instantiate(props.path, false);
                
        let meshes = removeRoot === true ? this.removeRoot(result.meshes) : result.meshes;

        result.animationGroups.forEach(animationGroup => animationGroup.stop());

        const mainMesh = props.mainMeshIndex !== undefined ? meshes[props.mainMeshIndex] : this.findMainMesh(meshes);
        const otherMeshes = meshes.filter(mesh => mesh !== mainMesh);

        meshObj.instance = new MeshInstance(<Mesh[]> [mainMesh, ...otherMeshes], result.isCloned, meshObj);

        meshObj.skeleton = result.skeletons.length > 0 ? result.skeletons[0] : undefined;
        meshObj.animation.setAnimations(result.animationGroups);
        meshObj.instance.getMesh().translate(Axis.Y, 0.2, Space.WORLD);
        meshObj.instance.getMesh().parent = this.worldProvider.world.ground;
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