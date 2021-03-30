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

    processFeature(gameObject: GameObj, feature: string): void {
        const [_feature, ...addons] = feature.split(' ');

        addons.forEach(addon => gameObject.addon.add(this.createAddon(<AddonName> addon.trim())));
    }

    private createAddon(addonName: AddonName) {
        switch(addonName) {
            case AddonName.Highlight:
                return new HighlightAddon(this.world);
            case AddonName.Transport:
                return new TransportAddon(this.world);
        }
    } 
}