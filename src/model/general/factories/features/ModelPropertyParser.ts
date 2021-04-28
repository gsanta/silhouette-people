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

    async processFeatureAsync(gameObject: MeshObj, attrs: string[]): Promise<void> {
        const [modelPath, mainMeshIndex, instanced] = attrs;

        const result = await this.load(modelPath);


        result.animationGroups.forEach(animationGroup => animationGroup.stop());

        const meshes = <Mesh[]> result.meshes;
        const mainMesh = mainMeshIndex ? meshes[mainMeshIndex] : this.findMainMesh(meshes);
        const otherMeshes = meshes.filter(mesh => mesh !== mainMesh);

        gameObject.instance = new MeshInstance([mainMesh, ...otherMeshes]);

        gameObject.skeleton = result.skeletons.length > 0 ? result.skeletons[0] : undefined;
        gameObject.animation.setAnimations(result.animationGroups);
        gameObject.instance.getMesh().translate(Axis.Y, 0.2, Space.WORLD);
        gameObject.instance.getMesh().parent = this.worldObj.ground;
    }

    private getMeshes(meshObj: MeshObj, result: ISceneLoaderAsyncResult, isIntanced: boolean): AbstractMesh[] {
        if (isIntanced && !this.meshInstanceStore.getInstance(meshObj.type)) {
            this.meshInstanceStore.addInstance(meshObj.type, <Mesh> result.meshes[0]);
            const instance = this.meshInstanceStore.getInstance(meshObj.type);
            instance.isVisible = false;

            return [instance.createInstance(meshObj.type)];
        }

        return <Mesh[]> result.meshes;
    }

    private async load(path: string) {
        return await SceneLoader.ImportMeshAsync('', "assets/models/", path, this.worldProvider.world.scene);
    }

    private findMainMesh(meshes: Mesh[]) {
        return meshes.find(mesh => mesh.getBoundingInfo().boundingBox.extendSize.x > 0) || meshes[0];
    }
}