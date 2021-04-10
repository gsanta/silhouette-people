import { MeshObj, MeshObjType, MeshObjTag } from "../model/objs/MeshObj";
import { Lookup } from "../services/Lookup";
import { IMeshObjStore } from "./IMeshObjStore";

export class ActiveMeshObjStoreDecorator implements IMeshObjStore {
    private lookup: Lookup;

    constructor(lookup: Lookup) {
        this.lookup = lookup;
    }

    private getActiveGameObjStore() {
        const worldObj = this.lookup.globalStore.getWorld();
        return worldObj ? worldObj.obj : undefined;
    }

    // TODO: possibly should be removed from here and from IGameObjStore interface also
    addObj(gameObject: MeshObj) {
        const objStore = this.getActiveGameObjStore();
        if (objStore) {
            objStore.addObj(gameObject);
        } 
    }

    getActivePlayer(): MeshObj {
        const objStore = this.getActiveGameObjStore();
        return objStore ? objStore.getActivePlayer() : undefined; 
    }

    getObjsByTag(tag: MeshObjTag): MeshObj[] {
        const objStore = this.getActiveGameObjStore();
        return objStore ? objStore.getObjsByTag(tag) : [];
    }

    getObjsByType(...type: MeshObjType[]): MeshObj[] {
        const objStore = this.getActiveGameObjStore();
        return objStore ? objStore.getObjsByType(...type) : [];
    }

    getAllGameObjects(): MeshObj[] {
        const objStore = this.getActiveGameObjStore();
        return objStore ? objStore.getAllGameObjects() : [];
    }

    dispose() {
        const objStore = this.getActiveGameObjStore();
        if (objStore) {
            objStore.dispose();
        }
    }
}