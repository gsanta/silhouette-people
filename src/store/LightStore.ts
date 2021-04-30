import { LightObj } from "../model/general/objs/LightObj";


export class LightStore {
    private highlightLight: LightObj;

    setHighlightLight(light: LightObj) {
        this.highlightLight = light;
    }

    getHighlightLight(): LightObj {
        return this.highlightLight;
    }
}