import { GameObj, GameObjectType, GameObjTag } from "../model/objs/GameObj";
import { World } from "../services/World";
import { IGameObjStore } from "./IGameObjStore";

export class ActiveGameObjStoreDecorator implements IGameObjStore {
    private world: World;

    constructor(world: World) {
        this.world = world;
    }

    private getActiveGameObjStore() {
        const activeDistrict = this.world.districtStore.getActiveDistrict()
        return activeDistrict ? activeDistrict.obj : undefined;
    }

    // TODO: possibly should be removed from here and from IGameObjStore interface also
    addGameObject(gameObject: GameObj) {
        const objStore = this.getActiveGameObjStore();
        if (objStore) {
            objStore.addGameObject(gameObject);
        } 
    }

    getPlayer(): GameObj {
        const objStore = this.getActiveGameObjStore();
        return objStore ? objStore.getPlayer() : undefined; 
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