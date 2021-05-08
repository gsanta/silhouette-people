import { NodeMaterial, SpotLight, Tools, Vector2, Vector3 } from "babylonjs";
import { Lookup } from "../../service/Lookup";
import { GameItem } from "./GameItem";

export class LightItem extends GameItem {
    light: SpotLight;

    constructor(light: SpotLight) {
        super();
        this.light = light;
    }

    setPosition2D(pos: Vector2) {
        this.light.position.x = pos.x;
        this.light.position.z = pos.y;
        this.light.setDirectionToTarget(new Vector3(pos.x, 0, pos.y));
    }

    setPosition(pos: Vector3) {
        LightItem.setPosition(this.light, pos);
    }

    getPosition(): Vector3 {
        return this.light.position;
    }

    dispose() {
        this.light.dispose();
    }

    private static setPosition(light: SpotLight, pos: Vector3) {
        light.position.x = pos.x;
        light.position.z = pos.z;
        light.position.y = 3;
        light.setDirectionToTarget(pos);
    }

    static async CreateProjectionTextureLight(config: { snippet: string, pos: Vector3 }, world: Lookup): Promise<LightItem> {
        const scene = world.scene;
        const { pos } = config;
        const light = new SpotLight("selection-light", new Vector3(0, 6, 0), new Vector3(0, -1, 0), Tools.ToRadians(45), 1, scene);
    
        await NodeMaterial.ParseFromSnippetAsync(config.snippet, scene).then((nodeMaterial) => {
            var proceduralTexture = nodeMaterial.createProceduralTexture(256, scene);
            light.intensity = 2;
            this.setPosition(light, pos);
            light.projectionTexture = proceduralTexture;
        });
        
        return new LightItem(light);
    }
}