import { NodeMaterial, SpotLight, Tools, Vector3 } from "babylonjs";
import { InjectProperty } from "../../di/diDecorators";
import { LightObj } from "../../model/general/objs/LightObj";
import { lookup } from "../Lookup";
import { WorldProvider } from "../WorldProvider";


export class LightFactory {

    @InjectProperty("WorldProvider")
    private worldProvider: WorldProvider;

    constructor() {
        this.worldProvider = lookup.worldProvider;
    }

    async createHighlightLight(snippet: string, pos: Vector3): Promise<LightObj> {
        const scene = this.worldProvider.world.scene;
        const light = new SpotLight("highlight-light", new Vector3(0, 6, 0), new Vector3(0, -1, 0), Tools.ToRadians(45), 1, scene);
    
        await NodeMaterial.ParseFromSnippetAsync(snippet, scene).then((nodeMaterial) => {
            var proceduralTexture = nodeMaterial.createProceduralTexture(256, scene);
            light.intensity = 2;
            light.projectionTexture = proceduralTexture;
        });
        
        const lightObj = new LightObj(light);
        lightObj.setPosition(pos);

        return lightObj;
    }
}