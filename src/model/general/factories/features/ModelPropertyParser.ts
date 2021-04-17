import { Axis, Mesh, SceneLoader, Space } from "babylonjs";
import { MeshObj } from "../../objs/MeshObj";
import { WorldObj } from "../../objs/WorldObj";
import { Lookup } from "../../../../services/Lookup";
import { AbstractPropertyParser } from "../AbstractPropertyParser";

export class ModelPropertyParser extends AbstractPropertyParser {
    private lookup: Lookup;
    private worldObj: WorldObj;

    constructor(worldObj: WorldObj, lookup: Lookup) {
        super();
        this.lookup = lookup;
        this.worldObj = worldObj;
    }

    feature = 'Model';

    isAsync(): boolean {
        return true;
    }

    async processFeatureAsync(gameObject: MeshObj, attrs: string[]): Promise<void> {
        const [modelPath, mainMeshIndex] = attrs;
        const result = await this.load(modelPath);
        result.animationGroups.forEach(animationGroup => animationGroup.stop());

        const meshes = <Mesh[]> result.meshes;
        const mainMesh = mainMeshIndex ? meshes[mainMeshIndex] : this.findMainMesh(meshes);

        gameObject.mainMesh = mainMesh;
        gameObject.allMeshes = <Mesh[]> result.meshes;

        gameObject.skeleton = result.skeletons.length > 0 ? result.skeletons[0] : undefined;
        gameObject.animation.setAnimations(result.animationGroups);
        gameObject.getMesh().translate(Axis.Y, 0.2, Space.WORLD);
        gameObject.getMesh().parent = this.worldObj.ground;
    }

    private async load(path: string) {
        return await SceneLoader.ImportMeshAsync('', "assets/models/", path, this.lookup.scene);
    }

    private findMainMesh(meshes: Mesh[]) {
        return meshes.find(mesh => mesh.getBoundingInfo().boundingBox.extendSize.x > 0) || meshes[0];
    }
}