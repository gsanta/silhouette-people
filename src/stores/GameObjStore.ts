import { WorldObj } from "../model/objs/WorldObj";
import { GameObj, GameObjectType, GameObjTag } from "../model/objs/GameObj";
import { IGameObjStore } from "./IGameObjStore";

export class GameObjStore implements IGameObjStore {
    private gameObjects: GameObj[] = [];
    private district: WorldObj;

    constructor(district: WorldObj) {
        this.district = district;
    }

    addGameObject(gameObject: GameObj) {
        this.gameObjects.push(gameObject);

        const quarterIndex = this.calcQuarterIndex(gameObject);
        gameObject.quarterIndex = quarterIndex;
    }

    getActivePlayer(): GameObj {
        const players = this.getGameObjsByTag(GameObjTag.Player);
        return players.find(player => player.player.isActive()) || players[0]; 
    }

    getGameObjsByTag(tag: GameObjTag): GameObj[] {
        return this.gameObjects.filter(gameObj => gameObj.tag.has(tag));
    }

    getGameObjsByType(...type: GameObjectType[]): GameObj[] {
        return this.gameObjects.filter(obj => type.includes(obj.type)); 
    }

    getObjById(id: string) {
        return this.gameObjects.find(obj => obj.id === id);
    }

    getAllGameObjects(): GameObj[] {
        return this.gameObjects;
    }

    dispose() {
        this.gameObjects.forEach(obj => obj.dispose());
    }

    private calcQuarterIndex(gameObject: GameObj): number {
        const pos = gameObject.getPosition2D();

        const quarterIndex = this.district.quarter.getAllQuarters().findIndex(quarter => quarter.containsPoint2D(pos));
        return quarterIndex;
    }
}