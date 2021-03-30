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

    async processFeatureAsync(gameObject: GameObj, feature: string): Promise<void> {
        const modelPath = feature.split(' ')[1].trim();
        const result = await this.load(modelPath);
        result.animationGroups.forEach(animationGroup => animationGroup.stop());

        gameObject.mesh.addMeshes(<Mesh[]> result.meshes);
        gameObject.skeleton = result.skeletons.length > 0 ? result.skeletons[0] : undefined;
        gameObject.animationGroups = result.animationGroups;
        gameObject.getMesh().translate(Axis.Y, 0.2, Space.WORLD);
    }

    private async load(path: string) {
        return await SceneLoader.ImportMeshAsync('', "assets/models/", path, this.world.scene);
    }
}