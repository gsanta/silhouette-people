import { LightObj } from "../model/object/LightObj";


export class LightStore {
    private highlightLight: LightObj;

    setHighlightLight(light: LightObj) {
        this.highlightLight = light;
    }

    getHighlightLight(): LightObj {
        return this.highlightLight;
    }
}