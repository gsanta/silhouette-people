import { StandardMaterial, Texture } from "babylonjs";
import { GameObject } from "../../../model/objects/game_object/GameObject";
import { SceneService } from "../../SceneService";
import { AbstractPropertyParser } from "../AbstractPropertyParser";

export interface TexturePropertyConfig {
    path: string;
    meshIndex?: number;
}

export class TexturePropertyParser extends AbstractPropertyParser<TexturePropertyConfig> {
    propName = 'texture';
    
    private readonly worldProvider: SceneService;

    constructor(sceneService: SceneService) {
        super();
        this.worldProvider = sceneService;
    }

    isAsync(): boolean {
        return false;
    }

    async processPropertyAsync(gameObject: GameObject, config: TexturePropertyConfig) {
        const index = config.meshIndex !== undefined ? config.meshIndex : 0;

        const texture = new Texture(`assets/textures/${config.path}`, this.worldProvider.scene);
        const material = new StandardMaterial(gameObject.id, this.worldProvider.scene);
        material.diffuseTexture = texture;
        material.specularColor = new BABYLON.Color3(0, 0, 0);

        gameObject.meshes[index].material = material;
    }
}