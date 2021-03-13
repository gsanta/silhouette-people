import { GameObject, GameObjectRole } from "../../model/GameObject";


export class GameObjectStore {
    private gameObjects: GameObject[] = [];

    add(gameObject: GameObject) {
        this.gameObjects.push(gameObject);
    }

    getByRole(role: GameObjectRole): GameObject[] {
        return this.gameObjects.filter(gameObject => gameObject.role === role);
    }
}