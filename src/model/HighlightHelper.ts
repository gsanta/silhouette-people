import { Vector3 } from "babylonjs";
import { InjectProperty } from "../di/diDecorators";
import { LightFactory } from "../service/object/light/LightFactory";
import { lookup } from "../service/Lookup";
import { LightStore } from "../store/LightStore";
import { LightObj } from "./object/LightObj";
import { MeshObj } from "./object/mesh/MeshObj";

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
        lightObj.setPosition2D(meshObj.instance.getPosition2D());
        meshObj.instance.addPositionChangeListener(() => {
            lightObj.setPosition2D(meshObj.instance.getPosition2D());
        });
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