import { Scene, Vector2 } from "babylonjs";
import { AreaMap } from "../controller/ai/AreaMap";
import { KeyboardHandler } from "../controller/KeyboardHandler";
import { GameObject } from "./GameObject";


export class World {
    
    keyboard: KeyboardHandler;
    gameObjects: GameObject[] = [];

    scene: Scene;
    areaMap: AreaMap;

    constructor() {
        this.keyboard = new KeyboardHandler();
        // this.areaMap = new AreaMap(new Vector2(0, 0), new Vector2(10, 10), 1);
    }
}