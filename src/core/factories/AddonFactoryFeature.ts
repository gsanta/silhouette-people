import { GameObj, GameObjectJson } from "../../model/objs/GameObj";
import { World } from "../../services/World";
import { AddonName } from "../components/AbstractAddon";
import { HighlightAddon } from "../components/HighlightAddon";
import { TransportAddon } from "../components/TransportAddon";
import { IFactoryFeature } from "./IFactoryFeacture";


export class AddonFactoryFeature implements IFactoryFeature {
    private world: World;

    constructor(world: World) {
        this.world = world;
    }

    process(gameObject: GameObj, json: GameObjectJson): void {
        (json.addons || []).forEach(addon => gameObject.addon.add(this.createAddon(<AddonName> addon)));
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