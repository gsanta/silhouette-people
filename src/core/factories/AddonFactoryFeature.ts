import { GameObj, GameObjectJson } from "../../model/objs/GameObj";
import { World } from "../../services/World";
import { AddonName } from "../components/AbstractAddon";
import { HighlightAddon } from "../components/HighlightAddon";
import { TransportAddon } from "../components/TransportAddon";
import { AbstractFactoryFeature } from "./AbstractFactoryFeacture";


export class AddonFactoryFeature extends AbstractFactoryFeature {
    private world: World;

    constructor(world: World) {
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
            case AddonName.Transport:
                const [targetDistrict, targetLocation]: [string, number] = [addonAttrs[0], parseInt(addonAttrs[1], 10)];
                return new TransportAddon(gameObj, targetDistrict, targetLocation, this.world);
        }
    } 
}