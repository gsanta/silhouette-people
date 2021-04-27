import { Vector3 } from "babylonjs";
import { InjectProperty } from "../../di/diDecorators";
import { LightFactory } from "../../services/factory/LightFactory";
import { lookup } from "../../services/Lookup";
import { LightStore } from "../../stores/LightStore";
import { LightObj } from "../general/objs/LightObj";
import { MeshObj } from "../general/objs/MeshObj";

export class HighlightHelper {
    private pending = false;
    private pendingMeshObj: MeshObj;

    @InjectProperty("LightStore")
    private lightStore: LightStore;

    @InjectProperty("LightFactory")
    private lightFactory: LightFactory;

    constructor() {
        this.lightStore = lookup.lightStore;
        this.lightFactory = lookup.lightFactory;
    }

    attachHighlightTo(meshObj: MeshObj) {
        const lightObj = this.lightStore.getHighlightLight();

        if (lightObj) {
            this.attachToMesh(meshObj, lightObj);
        } else {
            this.loadLightObj(meshObj);
        }
    }

    private attachToMesh(meshObj: MeshObj, lightObj: LightObj) {

        if (!meshObj.children.includes(lightObj)) {
            lightObj.setParent(meshObj);
        }
    }

    private loadLightObj(meshObj: MeshObj) {
        this.pendingMeshObj = meshObj;
    
        if (!this.pending) {
            this.pending = true;

            this.fetchProjectionLight()
        }
    }

    private async fetchProjectionLight() {
        const pos = this.pendingMeshObj.instance.getPosition2D();

        const lightObj = await this.lightFactory.createHighlightLight("RXBW6F", new Vector3(pos.x, 0, pos.y));
        this.lightStore.setHighlightLight(lightObj);
        
        this.attachToMesh(this.pendingMeshObj, lightObj);

        this.pending = false;
        this.pendingMeshObj = undefined;
    }
}