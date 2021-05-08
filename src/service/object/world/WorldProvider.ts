import { Scene } from "babylonjs";
import { Vector2 } from "babylonjs/Maths/math.vector";
import { WorldObj } from "../../../model/object/WorldObj";
import { WorldMap } from "./WorldMap";

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