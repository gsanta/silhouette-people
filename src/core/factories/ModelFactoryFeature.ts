import { Axis, Mesh, SceneLoader, Space } from "babylonjs";
import { GameObj } from "../../model/objs/GameObj";
import { World } from "../../services/World";
import { AbstractFactoryFeature } from "./AbstractFactoryFeacture";

export class ModelFactoryFeature extends AbstractFactoryFeature {
    private world: World;

    constructor(world: World) {
        super();
        this.world = world;
    }

    feature = 'Model';

    isAsync(): boolean {
        return true;
    }

    async processFeatureAsync(gameObject: GameObj, attrs: string[]): Promise<void> {
        const [modelPath, mainMeshIndex] = attrs;
        const result = await this.load(modelPath);
        result.animationGroups.forEach(animationGroup => animationGroup.stop());

        const meshes = <Mesh[]> result.meshes;
        const mainMesh = mainMeshIndex ? meshes[mainMeshIndex] : this.findMainMesh(meshes);

        gameObject.mesh.addMeshes(<Mesh[]> result.meshes, mainMesh);

        gameObject.skeleton = result.skeletons.length > 0 ? result.skeletons[0] : undefined;
        gameObject.animationGroups = result.animationGroups;
        gameObject.getMesh().translate(Axis.Y, 0.2, Space.WORLD);
        gameObject.getMesh().parent = this.world.store.getActiveDistrict().basicComp.platform;
    }

    private async load(path: string) {
        return await SceneLoader.ImportMeshAsync('', "assets/models/", path, this.world.scene);
    }

    private findMainMesh(meshes: Mesh[]) {
        return meshes.find(mesh => mesh.getBoundingInfo().boundingBox.extendSize.x > 0) || meshes[0];
    }
}