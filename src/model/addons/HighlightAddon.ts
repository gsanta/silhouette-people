import { Vector3 } from "babylonjs";
import { Lookup } from "../../services/Lookup";
import { MeshObj } from "../objs/MeshObj";
import { LightObj } from "../objs/LightObj";
import { AbstractAddon, AddonName } from "./AbstractAddon";

export class HighlightAddon extends AbstractAddon {
    name: AddonName = AddonName.Highlight;
    private world: Lookup;
    private isLoading = false;

    constructor(world: Lookup) {
        super();
        this.world = world;
    }

    update(gameObj: MeshObj) {
        const lightObj = this.world.globalStore.getHighlight();
        if (!lightObj && !this.isLoading) {
            this.isLoading = true;
            this.lazyInit(gameObj);
        }

        if (lightObj) {
            const pos = gameObj.getPosition2D();
            lightObj.setPosition(new Vector3(pos.x, 0, pos.y));
        }
    }

    private async lazyInit(gameObj: MeshObj) {
        const pos = gameObj.getPosition2D();

        const lightObj = await LightObj.CreateProjectionTextureLight({snippet: "RXBW6F", pos: new Vector3(pos.x, 0, pos.y)}, this.world);
        this.world.globalStore.setHighlight(lightObj);
    }
}