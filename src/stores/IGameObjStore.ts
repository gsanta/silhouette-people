import { GameObj, GameObjectType, GameObjTag } from "../model/objs/GameObj";

export interface IGameObjStore {
    addGameObject(gameObject: GameObj);

    getActivePlayer(): GameObj;

    getGameObjsByTag(tag: GameObjTag): GameObj[];

    getGameObjsByType(...type: GameObjectType[]): GameObj[];

    getAllGameObjects(): GameObj[];

    dispose();
}