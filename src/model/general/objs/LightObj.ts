import { NodeMaterial, SpotLight, Tools, Vector3 } from "babylonjs";
import { Lookup } from "../../../services/Lookup";

export class LightObj {
    light: SpotLight;

    constructor(light: SpotLight) {
        this.light = light;
    }

    setPosition(pos: Vector3) {
        LightObj.setPosition(this.light, pos);
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

    static async CreateProjectionTextureLight(config: { snippet: string, pos: Vector3 }, world: Lookup): Promise<LightObj> {
        const scene = world.scene;
        const { pos } = config;
        const light = new SpotLight("selection-light", new Vector3(0, 6, 0), new Vector3(0, -1, 0), Tools.ToRadians(45), 1, scene);
    
        await NodeMaterial.ParseFromSnippetAsync(config.snippet, scene).then((nodeMaterial) => {
            var proceduralTexture = nodeMaterial.createProceduralTexture(256, scene);
            light.intensity = 2;
            this.setPosition(light, pos);
            light.projectionTexture = proceduralTexture;
        });
        
        return new LightObj(light);
    }
}