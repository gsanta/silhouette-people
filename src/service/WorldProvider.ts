import { Scene } from "babylonjs";
import { Vector2 } from "babylonjs/Maths/math.vector";
import { WorldObj } from "../model/item/WorldObj";
import { WorldMap } from "./base/import/map/WorldMap";

export class WorldProvider {
    private worldObj: WorldObj;

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
}