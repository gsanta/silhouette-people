import { Scene } from "babylonjs";
import { WorldObj } from "../../../model/object/WorldObj";
import { WorldMap } from "./WorldMap";

export class WorldProvider {
    private worldObj: WorldObj;

    worldMap: WorldMap;
    canvas: HTMLCanvasElement;
    scene: Scene;

    get world(): WorldObj {
        return this.worldObj;
    }

    set world(worldObj: WorldObj) {
        this.worldObj = worldObj;
    }
}