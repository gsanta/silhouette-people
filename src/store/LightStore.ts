import { LightItem } from "../model/item/LightItem";


export class LightStore {
    private highlightLight: LightItem;

    setHighlightLight(light: LightItem) {
        this.highlightLight = light;
    }

    getHighlightLight(): LightItem {
        return this.highlightLight;
    }
}