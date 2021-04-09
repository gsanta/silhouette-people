import { Axis, Color3, Color4, MeshBuilder, Space, StandardMaterial, Vector2, Vector3 } from "babylonjs";
import { QuarterObj } from "../../model/objs/QuarterObj";
import { WorldObj } from "../../model/objs/WorldObj";
import { Lookup } from "../Lookup";

export interface QuarterObjConfig {
    color: string;
    position: Vector2;
}

export class QuarterObjFactory {
    private lookup: Lookup;

    constructor(lookup: Lookup) {
        this.lookup = lookup;
    }

    createQuarter(config: QuarterObjConfig, worldObj: WorldObj): void {
        const { position, color } = config;

        const id = `ground-${position.x}-${position.y}`;
        const size = worldObj.quarterSize;
        const ground = MeshBuilder.CreateGround(id, { width: size.x, height: size.y });
        ground.enableEdgesRendering();
        ground.edgesWidth = 5.0;
        ground.edgesColor = new Color4(0, 0, 1, 1);
        
        const material = new StandardMaterial(`${id}-material`, this.lookup.scene);
        material.diffuseColor = Color3.FromHexString(color);
        material.specularColor = new Color3(0, 0, 0);
        ground.material = material;
        

        const translateX = position.x * size.x + size.x / 2;
        const translateY = position.y * size.y - size.y / 2;

        ground.translate(new Vector3(translateX, 0, translateY), 1, Space.WORLD);
        ground.parent = worldObj.basicComp.platform;
        ground.translate(Axis.Y, 0.2, Space.WORLD);

        const quarter = new QuarterObj(worldObj, ground);
        
        worldObj.quarter.addQuarter(quarter);
    }
}