import { StandardMaterial, Texture } from "babylonjs";
import { GameObj } from "../../model/objs/GameObj";
import { World } from "../../services/World";
import { AbstractFactoryFeature } from "./AbstractFactoryFeacture";


export class TextureFactoryFeature extends AbstractFactoryFeature {
    private world: World;

    constructor(world: World) {
        super();
        this.world = world;
    }

    feature = 'Texture';

    isAsync(): boolean {
        return false;
    }

    processFeature(gameObject: GameObj, feature: string) {
        const parts = feature.split(' ');
        const texturePath = feature.split(' ')[1].trim();
        const index = parts.length > 2 ? parseInt(parts[2], 10) : 0;

        const texture = new Texture(`assets/textures/${texturePath}`, this.world.scene);
        const material = new StandardMaterial(gameObject.id, this.world.scene);
        material.diffuseTexture = texture;
        material.specularColor = new BABYLON.Color3(0, 0, 0);

        gameObject.allMeshes[index].material = material;
    }
}