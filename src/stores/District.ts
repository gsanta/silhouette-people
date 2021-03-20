import { GameObject, GameObjectRole } from "../model/game_object/GameObject";
import { Quarter } from "./Quarter";

export class District {
    id: string
    private gameObjects: GameObject[] = [];
        
    private quarters: Quarter[] = [];

    getQuarter(index: number): Quarter {
        return this.quarters[index];
    }

    addGameObject(gameObject: GameObject) {
        this.gameObjects.push(gameObject);
    }

    getGameObjectByRole(role: GameObjectRole): GameObject[] {
        return this.gameObjects.filter(gameObject => gameObject.role === role);
    }

    getAllGameObjects(): GameObject[] {
        return this.gameObjects;
    }
}