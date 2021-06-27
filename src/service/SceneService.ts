import { Scene } from "babylonjs";
import { Vector2 } from "babylonjs/Maths/math.vector";
import { WorldObj } from "../model/objects/WorldObj";
import { BaseService } from "./BaseService";
import { WorldMap } from "./import/WorldMap";

export class SceneService {
    private worldObj: WorldObj;
    private baseServices: BaseService[] = [];
    private _awaken = false;

    worldMap: WorldMap;

    canvas: HTMLCanvasElement;
    scene: Scene;

    quarterNum: Vector2;
    worldSize: Vector2;

    get world(): WorldObj {
        return this.worldObj;
    }

    set world(worldObj: WorldObj) {
        this.worldObj = worldObj;
    }

    addBaseService(baseService: BaseService) {
        this.baseServices.push(baseService);

        if (this._awaken) {
            // without settimeout baseservice's constructor haven't fully run 
            setTimeout(() => {
                baseService.awake();
            }, 0);
        }
    }

    awakeAll() {
        this._awaken = true;

        this.baseServices.forEach(service => service.awake());
    }

    update(deltaTime: number) {
        this.baseServices.forEach(service => service.update(deltaTime));
    }
}