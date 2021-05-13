import { StandardMaterial, Texture } from "babylonjs";
import { MeshItem } from "../../../../model/item/mesh/MeshItem";
import { Lookup } from "../../../Lookup";
import { WorldProvider } from "../../../WorldProvider";
import { AbstractPropertyParser } from "../AbstractPropertyParser";

export interface TexturePropertyConfig {
    path: string;
    meshIndex: number;
}

export class TexturePropertyParser extends AbstractPropertyParser<TexturePropertyConfig> {
    propName = 'texture';
    
    private readonly worldProvider: WorldProvider;

    constructor(worldProvider: WorldProvider) {
        super();
        this.worldProvider = worldProvider;
    }

    isAsync(): boolean {
        return false;
    }

    processProperty(gameObject: MeshItem, config: TexturePropertyConfig) {
        const index = config.meshIndex !== undefined ? config.meshIndex : 0;

        const texture = new Texture(`assets/textures/${config.path}`, this.worldProvider.scene);
        const material = new StandardMaterial(gameObject.id, this.worldProvider.scene);
        material.diffuseTexture = texture;
        material.specularColor = new BABYLON.Color3(0, 0, 0);

        gameObject.instance.getAllMeshes()[index].material = material;
    }
}