import { GameObj, GameObjectType, GameObjTag } from "../model/objs/GameObj";
import { World } from "../services/World";
import { IGameObjStore } from "./IGameObjStore";

export class ActiveGameObjStoreDecorator implements IGameObjStore {
    private world: World;

    constructor(world: World) {
        this.world = world;
    }

    private getActiveGameObjStore() {
        return this.world.districtStore.getActiveDistrict().obj;
    }

    // TODO: possibly should be removed from here and from IGameObjStore interface also
    addGameObject(gameObject: GameObj) {
        this.getActiveGameObjStore().addGameObject(gameObject);
    }

    getPlayer(): GameObj {
        return this.getActiveGameObjStore().getGameObjsByTag(GameObjTag.Player)[0];
    }

    getGameObjsByTag(tag: GameObjTag): GameObj[] {
        return this.getActiveGameObjStore().getAllGameObjects().filter(obj => obj.tag.has(tag));
    }

    getGameObjsByType(...type: GameObjectType[]): GameObj[] {
        return this.getActiveGameObjStore().getAllGameObjects().filter(obj => type.includes(obj.type));
    }

    getAllGameObjects(): GameObj[] {
        return this.getActiveGameObjStore().getAllGameObjects();
    }

    remove() {
        this.getActiveGameObjStore().remove();
    }
}