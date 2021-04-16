import { MeshObj, GameObjectJson } from "../../objs/MeshObj";
import { Lookup } from "../../../../services/Lookup";
import { AddonName } from "../../../addons/AbstractAddon";
import { HighlightAddon } from "../../../addons/HighlightAddon";
import { AbstractFeatureParser } from "../AbstractFeactureParser";


export class AddonFeatureParser extends AbstractFeatureParser {
    private world: Lookup;

    constructor(world: Lookup) {
        super();
        this.world = world;
    }

    feature = 'Addon';

    isAsync() {
        return false;
    }

    processFeature(gameObject: MeshObj, attrs: string[]): void {
        const [addonName, ...addonAttrs] = attrs;
        
        const addon = this.createAddon(gameObject, <AddonName> addonName.trim(), addonAttrs);
        gameObject.addon.add(addon);
        // addons.forEach(addon => gameObject.addon.add(this.createAddon(gameObject, <AddonName> addon.trim())));
    }

    private createAddon(gameObj: MeshObj, addonName: AddonName, addonAttrs: any[]) {
        switch(addonName) {
            case AddonName.Highlight:
                return new HighlightAddon(this.world);
        }
    } 
}