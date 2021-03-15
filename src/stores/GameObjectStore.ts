import { GameObject, GameObjectType } from "../model/game_object/GameObject";


export class GameObjectStore {
    private gameObjects: GameObject[] = [];

    add(gameObject: GameObject) {
        this.gameObjects.push(gameObject);
    }

    getByRole(role: GameObjectType): GameObject[] {
        return this.gameObjects.filter(gameObject => gameObject.role === role);
    }

    getAll(): GameObject[] {
        return this.gameObjects;
    }
}