import { Scene, Vector2 } from "babylonjs";
import { AiFacade } from "../controller/ai/AiFacade";
import { AreaMap } from "../controller/ai/AreaMap";
import { DebugFacade } from "../controller/debug/DebugFacade";
import { KeyboardHandler } from "../controller/KeyboardHandler";
import { GameObject } from "./GameObject";


export class World {
    keyboard: KeyboardHandler;
    gameObjects: GameObject[] = [];

    scene: Scene;
    areaMap: AreaMap;

    ai: AiFacade;
    debug: DebugFacade;

    private isReady: boolean = false;
    private onReadyFuncs: (() => void)[] = [];

    constructor() {
        this.keyboard = new KeyboardHandler();
        this.ai = new AiFacade();
        this.debug = new DebugFacade(this);
    }

    setScene(scene: Scene) {
        this.scene = scene;
        this.onReadyFuncs.forEach(func => func());
    }

    onReady(onReadyFunc: () => void) {
        if (this.isReady) {
            onReadyFunc();
        } else {
            this.onReadyFuncs.push(onReadyFunc);
        }
    }
}