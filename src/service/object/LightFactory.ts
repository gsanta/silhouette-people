import { NodeMaterial, SpotLight, Tools, Vector3 } from "babylonjs";
import { LightObject } from "../../model/objects/light/LightObject";
import { WorldProvider } from "../WorldProvider";

export class LightFactory {
    private readonly worldProvider: WorldProvider;

    constructor(worldProvider: WorldProvider) {
        this.worldProvider = worldProvider;
    }

    async createHighlightLight(snippet: string, pos: Vector3): Promise<LightObject> {
        const scene = this.worldProvider.scene;
        const light = new SpotLight("highlight-light", new Vector3(0, 6, 0), new Vector3(0, -1, 0), Tools.ToRadians(45), 1, scene);
    
        await NodeMaterial.ParseFromSnippetAsync(snippet, scene).then((nodeMaterial) => {
            var proceduralTexture = nodeMaterial.createProceduralTexture(256, scene);
            light.intensity = 2;
            light.projectionTexture = proceduralTexture;
        });
        
        const lightObj = new LightObject(light);
        lightObj.position = pos;

        return lightObj;
    }
}