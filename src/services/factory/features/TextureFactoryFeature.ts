import { StandardMaterial, Texture } from "babylonjs";
import { MeshObj } from "../../../model/objs/MeshObj";
import { Lookup } from "../../Lookup";
import { AbstractFactoryFeature } from "./AbstractFactoryFeacture";


export class TextureFactoryFeature extends AbstractFactoryFeature {
    private world: Lookup;

    constructor(world: Lookup) {
        super();
        this.world = world;
    }

    feature = 'Texture';

    isAsync(): boolean {
        return false;
    }

    processFeature(gameObject: MeshObj, attrs: string[]) {
        const [texturePath, textureIndex] = attrs;
        const index = textureIndex !== undefined ? parseInt(textureIndex, 10) : 0;

        const texture = new Texture(`assets/textures/${texturePath}`, this.world.scene);
        const material = new StandardMaterial(gameObject.id, this.world.scene);
        material.diffuseTexture = texture;
        material.specularColor = new BABYLON.Color3(0, 0, 0);

        gameObject.allMeshes[index].material = material;
    }
}