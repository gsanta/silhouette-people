import { AbstractMesh, Axis, ISceneLoaderAsyncResult, Mesh, SceneLoader, Space } from "babylonjs";
import { MeshObj } from "../../objs/MeshObj";
import { WorldObj } from "../../objs/WorldObj";
import { AbstractPropertyParser } from "../AbstractPropertyParser";
import { MeshInstance } from "../../objs/MeshInstance";
import { WorldProvider } from "../../../../services/WorldProvider";
import { MeshInstanceStore } from "../../../../stores/MeshInstanceStore";
import { InstancedMesh } from "babylonjs/Meshes/instancedMesh";

export class ModelPropertyParser extends AbstractPropertyParser {
    private worldObj: WorldObj;
    private meshInstanceStore: MeshInstanceStore;
    private worldProvider: WorldProvider;

    constructor(worldObj: WorldObj, worldProvider: WorldProvider, meshInstanceStore: MeshInstanceStore) {
        super();
        this.worldObj = worldObj;
        this.worldProvider = worldProvider;
        this.meshInstanceStore = meshInstanceStore;
    }

    feature = 'Model';

    isAsync(): boolean {
        return true;
    }

    async processFeatureAsync(meshObj: MeshObj, attrs: string[]): Promise<void> {
        const [modelPath, mainMeshIndex, removeRoot] = attrs;

        const result = await this.loadMeshOrGetFromCache(meshObj, modelPath);
                
        let meshes = removeRoot ? this.removeRoot(result.meshes) : result.meshes;

        result.animationGroups.forEach(animationGroup => animationGroup.stop());

        const mainMesh = mainMeshIndex ? meshes[mainMeshIndex] : this.findMainMesh(meshes);
        const otherMeshes = meshes.filter(mesh => mesh !== mainMesh);

        meshObj.instance = new MeshInstance([mainMesh, ...otherMeshes], meshObj);

        meshObj.skeleton = result.skeletons.length > 0 ? result.skeletons[0] : undefined;
        meshObj.animation.setAnimations(result.animationGroups);
        meshObj.instance.getMesh().translate(Axis.Y, 0.2, Space.WORLD);
        meshObj.instance.getMesh().parent = this.worldObj.ground;
    }

    private async loadMeshOrGetFromCache(meshObj: MeshObj, modelPath: string): Promise<ISceneLoaderAsyncResult> {
        let result: ISceneLoaderAsyncResult;

        if (this.meshInstanceStore.hasInstance(meshObj.type)) {
            result = this.meshInstanceStore.getInstance(meshObj.type);
        } else {
            result = await SceneLoader.ImportMeshAsync('', "assets/models/", modelPath, this.worldProvider.world.scene);
            // this.meshInstanceStore.addInstance(meshObj.type, result);
        }

        return result;
    }

    private removeRoot(meshes: AbstractMesh[]): AbstractMesh[] {
        if (meshes[0].id === '__root__' && meshes.length > 1) {
            const root = meshes[0];
            const mesh = meshes[1];
            let newRoot: AbstractMesh;
            if (mesh.parent) {
                if (mesh.parent === root) {
                    mesh.setParent(null);
                    newRoot = <AbstractMesh> mesh;
                } else if (mesh.parent.parent === root) {
                    (<AbstractMesh> mesh.parent).setParent(null);
                    newRoot = <AbstractMesh> mesh.parent;
                }
            }

            if (newRoot) {
                return [newRoot];
            }
        }

        return meshes;
    }

    private findMainMesh(meshes: AbstractMesh[]) {
        return meshes.find(mesh => mesh.getBoundingInfo().boundingBox.extendSize.x > 0) || meshes[0];
    }
}