import { LightObject } from "../model/objects/light/LightObject";


export class LightStore {
    private highlightLight: LightObject;

    setHighlightLight(light: LightObject) {
        this.highlightLight = light;
    }

    getHighlightLight(): LightObject {
        return this.highlightLight;
    }
}