import { Lookup } from "./Lookup";

export class LoaderService {
    private lookup: Lookup;
    private _isLoaded = false;

    constructor(lookup: Lookup) {
        this.lookup = lookup;
    }

    isLoaded() {
        return this._isLoaded;
    }

    async loadGame() {
        const worldObj = await this.lookup.worldFactory.createWorldObj('level-1');
        this.lookup.globalStore.setWorld(worldObj);
        this._isLoaded = true;
    }
}