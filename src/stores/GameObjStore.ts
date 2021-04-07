import { GameObj, GameObjectType, GameObjTag } from "../model/objs/GameObj";
import { IGameObjStore } from "./IGameObjStore";

export class GameObjStore implements IGameObjStore {
    private gameObjects: GameObj[] = [];

    addGameObject(gameObject: GameObj) {
        this.gameObjects.push(gameObject);

        // const quarterIndex = this.calcQuarterIndex(gameObject);
        // gameObject.quarterIndex = quarterIndex;
    }

    getPlayer(): GameObj {
        return this.getGameObjsByTag(GameObjTag.Player)[0];
    }

    getGameObjsByTag(tag: GameObjTag): GameObj[] {
        return this.gameObjects.filter(gameObj => gameObj.tag.has(tag));
    }

    getGameObjsByType(...type: GameObjectType[]): GameObj[] {
        return this.gameObjects.filter(obj => type.includes(obj.type)); 
    }

    getAllGameObjects(): GameObj[] {
        return this.gameObjects;
    }

    dispose() {
        this.gameObjects.forEach(obj => obj.dispose());
    }
}