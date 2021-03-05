import { Scene } from "babylonjs";
import { KeyboardHandler } from "../controller/KeyboardHandler";
import { GameObject } from "./GameObject";


export class World {
    
    keyboard: KeyboardHandler;
    gameObjects: GameObject[] = [];

    scene: Scene;

    constructor() {
        this.keyboard = new KeyboardHandler();
    }
}