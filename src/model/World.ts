import { KeyboardHandler } from "../controller/KeyboardHandler";
import { GameObject } from "./GameObject";


export class World {
    
    keyboard: KeyboardHandler;
    gameObjects: GameObject[] = [];

    constructor() {
        this.keyboard = new KeyboardHandler();
    }
}