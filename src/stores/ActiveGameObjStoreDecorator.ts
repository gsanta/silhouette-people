import { GameObj, GameObjectType, GameObjTag } from "../model/objs/GameObj";
import { Lookup } from "../services/Lookup";
import { IGameObjStore } from "./IGameObjStore";

export class ActiveGameObjStoreDecorator implements IGameObjStore {
    private lookup: Lookup;

    constructor(lookup: Lookup) {
        this.lookup = lookup;
    }

    private getActiveGameObjStore() {
        const worldObj = this.lookup.globalStore.getWorld();
        return worldObj ? worldObj.obj : undefined;
    }

    // TODO: possibly should be removed from here and from IGameObjStore interface also
    addGameObject(gameObject: GameObj) {
        const objStore = this.getActiveGameObjStore();
        if (objStore) {
            objStore.addGameObject(gameObject);
        } 
    }

    getActivePlayer(): GameObj {
        const objStore = this.getActiveGameObjStore();
        return objStore ? objStore.getActivePlayer() : undefined; 
    }

    getGameObjsByTag(tag: GameObjTag): GameObj[] {
        const objStore = this.getActiveGameObjStore();
        return objStore ? objStore.getGameObjsByTag(tag) : [];
    }

    getGameObjsByType(...type: GameObjectType[]): GameObj[] {
        const objStore = this.getActiveGameObjStore();
        return objStore ? objStore.getGameObjsByType(...type) : [];
    }

    getAllGameObjects(): GameObj[] {
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