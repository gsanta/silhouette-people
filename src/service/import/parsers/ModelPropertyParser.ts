import { AbstractMesh, Axis, Mesh, Space } from "babylonjs";
import { GameObject } from "../../../model/objects/game_object/GameObject";
import { AssetContainerStore } from "../../../store/AssetContainerStore";
import { WorldProvider } from "../../WorldProvider";
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

    async processPropertyAsync(meshItem: GameObject, props: ModelPropertyConfig): Promise<void> {
        const removeRoot = props.removeRoot;
        meshItem.mainMeshIndex = props.mainMeshIndex;

        const result = await this.assetContainerStore.instantiate(props.path, false);
                
        let meshes = removeRoot === true ? this.removeRoot(result.meshes) : result.meshes;

        result.animationGroups.forEach(animationGroup => animationGroup.stop());

        const mainMesh = meshes[0];
        const otherMeshes = meshes.filter(mesh => mesh !== mainMesh);

        meshItem.meshes = <Mesh[]> [mainMesh, ...otherMeshes];

        meshItem.skeleton = result.skeletons.length > 0 ? result.skeletons[0] : undefined;
        meshItem.animation.setAnimations(result.animationGroups);
        meshItem.mesh.translate(Axis.Y, 0.2, Space.WORLD);
    }

    private removeRoot(meshes: AbstractMesh[]): AbstractMesh[] {
        if (meshes[0].id.indexOf('__root__') !== -1 && meshes[0].getChildren().length === 1) {
            const root = meshes[0];
            const newRoot = <AbstractMesh> meshes[0].getChildren()[0];
            newRoot.setParent(null);
            root.dispose();
            return [newRoot];
        }

        return meshes;
    }
}