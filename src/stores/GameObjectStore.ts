import { GameObject, GameObjectRole, GameObjectType } from "../model/game_object/GameObject";


export class GameObjectStore {
    private gameObjects: GameObject[] = [];

    add(gameObject: GameObject) {
        this.gameObjects.push(gameObject);
    }

    getByRole(role: GameObjectRole): GameObject[] {
        return this.gameObjects.filter(gameObject => gameObject.role === role);
    }

    getAll(): GameObject[] {
        return this.gameObjects;
    }
}