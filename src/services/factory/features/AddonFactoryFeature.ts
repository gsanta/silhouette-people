import { GameObj, GameObjectJson } from "../../../model/objs/GameObj";
import { Lookup } from "../../Lookup";
import { AddonName } from "../../../model/addons/AbstractAddon";
import { HighlightAddon } from "../../../model/addons/HighlightAddon";
import { AbstractFactoryFeature } from "./AbstractFactoryFeacture";


export class AddonFactoryFeature extends AbstractFactoryFeature {
    private world: Lookup;

    constructor(world: Lookup) {
        super();
        this.world = world;
    }

    feature = 'Addon';

    isAsync() {
        return false;
    }

    processFeature(gameObject: GameObj, attrs: string[]): void {
        const [addonName, ...addonAttrs] = attrs;
        
        const addon = this.createAddon(gameObject, <AddonName> addonName.trim(), addonAttrs);
        gameObject.addon.add(addon);
        // addons.forEach(addon => gameObject.addon.add(this.createAddon(gameObject, <AddonName> addon.trim())));
    }

    private createAddon(gameObj: GameObj, addonName: AddonName, addonAttrs: any[]) {
        switch(addonName) {
            case AddonName.Highlight:
                return new HighlightAddon(this.world);
        }
    } 
}