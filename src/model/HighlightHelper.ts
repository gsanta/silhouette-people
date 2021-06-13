import { Vector3 } from "babylonjs";
import { InjectProperty } from "../di/diDecorators";
import { LightFactory } from "../service/object/light/LightFactory";
import { lookup } from "../service/Lookup";
import { LightStore } from "../store/LightStore";
import { LightObject } from "./objects/light/LightObject";
import { GameObject } from "./objects/game_object/GameObject";

export class HighlightHelper {
    private pending = false;
    private pendingMeshObj: GameObject;

    @InjectProperty("LightStore")
    private lightStore: LightStore;

    @InjectProperty("LightFactory")
    private lightFactory: LightFactory;

    constructor() {
        this.lightStore = lookup.lightStore;
        this.lightFactory = lookup.lightFactory;
    }

    attachHighlightTo(meshObj: GameObject) {
        const lightObj = this.lightStore.getHighlightLight();

        if (lightObj) {
            this.attachToMesh(meshObj, lightObj);
        } else {
            this.loadLightObj(meshObj);
        }
    }

    private attachToMesh(meshObj: GameObject, lightObj: LightObject) {
        lightObj.position2D = meshObj.position2D;
        meshObj.addPositionChangeListener(() => {
            lightObj.position2D = meshObj.position2D;
        });
    }

    private loadLightObj(meshObj: GameObject) {
        this.pendingMeshObj = meshObj;
    
        if (!this.pending) {
            this.pending = true;

            this.fetchProjectionLight()
        }
    }

    private async fetchProjectionLight() {
        const pos = this.pendingMeshObj.position2D;

        const lightObj = await this.lightFactory.createHighlightLight("RXBW6F", new Vector3(pos.x, 0, pos.y));
        this.lightStore.setHighlightLight(lightObj);
        
        this.attachToMesh(this.pendingMeshObj, lightObj);

        this.pending = false;
        this.pendingMeshObj = undefined;
    }
}