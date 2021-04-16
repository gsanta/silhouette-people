import { AbstractAddon, AddonName } from "../../addons/AbstractAddon";


export class AddonComponent {
    private addons: AbstractAddon[] = [];


    add(addon: AbstractAddon) {
        this.addons.push(addon);
    }

    remove(addon: AbstractAddon) {
        this.addons = this.addons.filter(a => a !== addon);
    }

    getByName(addonName: AddonName) {
        return this.addons.find(addon => addon.name === addonName);
    }

    getAll(): AbstractAddon[] {
        return this.addons;
    }
}