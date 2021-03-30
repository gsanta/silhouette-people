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

    processFeature(gameObject: GameObj, attrs: string[]) {
        const texturePath = attrs[1]
        const index = attrs.length > 2 ? parseInt(attrs[2], 10) : 0;

        const texture = new Texture(`assets/textures/${texturePath}`, this.world.scene);
        const material = new StandardMaterial(gameObject.id, this.world.scene);
        material.diffuseTexture = texture;
        material.specularColor = new BABYLON.Color3(0, 0, 0);

        gameObject.allMeshes[index].material = material;
    }
}