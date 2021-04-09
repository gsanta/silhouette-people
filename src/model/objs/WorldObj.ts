import { Vector2 } from "babylonjs";
import { Lookup } from "../../services/Lookup";
import { GameObjStore } from "../../stores/GameObjStore";
import { QuarterStore } from "../../stores/QuarterStore";
import { BasicDistrictComponent } from "./BasicDistrictComponent";

export class WorldObj {
    cameraLocation: number;

    readonly size: Vector2;
    readonly quarterNum: Vector2;

    basicComp: BasicDistrictComponent;
    obj: GameObjStore;
    quarter: QuarterStore;

    constructor(worldSize: Vector2, cameraLocation: number, quarterNum: Vector2, lookup: Lookup) {
        this.size = worldSize;
        this.cameraLocation = cameraLocation;
        this.quarterNum = quarterNum;
        
        this.basicComp = new BasicDistrictComponent();

        this.obj = new GameObjStore(this);
        this.quarter = new QuarterStore();
    }
}