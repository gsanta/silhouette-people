import { NodeMaterial, SpotLight, Tools, Vector3 } from "babylonjs";
import { InjectProperty } from "../../../di/diDecorators";
import { LightItem } from "../../../model/item/LightItem";
import { lookup } from "../../Lookup";
import { WorldProvider } from "../world/WorldProvider";


export class LightFactory {

    @InjectProperty("WorldProvider")
    private worldProvider: WorldProvider;

    constructor() {
        this.worldProvider = lookup.worldProvider;
    }

    async createHighlightLight(snippet: string, pos: Vector3): Promise<LightItem> {
        const scene = this.worldProvider.scene;
        const light = new SpotLight("highlight-light", new Vector3(0, 6, 0), new Vector3(0, -1, 0), Tools.ToRadians(45), 1, scene);
    
        await NodeMaterial.ParseFromSnippetAsync(snippet, scene).then((nodeMaterial) => {
            var proceduralTexture = nodeMaterial.createProceduralTexture(256, scene);
            light.intensity = 2;
            light.projectionTexture = proceduralTexture;
        });
        
        const lightObj = new LightItem(light);
        lightObj.setPosition(pos);

        return lightObj;
    }
}