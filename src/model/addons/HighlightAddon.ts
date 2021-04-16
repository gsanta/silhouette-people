import { Vector3 } from "babylonjs";
import { Lookup } from "../../services/Lookup";
import { MeshObj } from "../general/objs/MeshObj";
import { LightObj } from "../general/objs/LightObj";
import { AbstractAddon, AddonName } from "./AbstractAddon";

export class HighlightAddon extends AbstractAddon {
    name: AddonName = AddonName.Highlight;
    private world: Lookup;
    private isLoading = false;
    // TODO: store is somewhere in store, so that it can be disposed
    private lightObj: LightObj;

    constructor(world: Lookup) {
        super();
        this.world = world;
    }

    update(gameObj: MeshObj) {
        if (!this.lightObj && !this.isLoading) {
            this.isLoading = true;
            this.lazyInit(gameObj);
        }

        if (this.lightObj) {
            const pos = gameObj.getPosition2D();
            this.lightObj.setPosition(new Vector3(pos.x, 0, pos.y));
        }
    }

    private async lazyInit(gameObj: MeshObj) {
        const pos = gameObj.getPosition2D();

        const lightObj = await LightObj.CreateProjectionTextureLight({snippet: "RXBW6F", pos: new Vector3(pos.x, 0, pos.y)}, this.world);
        this.lightObj = lightObj;
    }
}