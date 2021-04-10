import { Scene, Vector2 } from "babylonjs";
import { Lookup } from "../../services/Lookup";
import { MeshObjStore } from "../../stores/MeshObjStore";
import { QuarterStore } from "../../stores/QuarterStore";
import { BasicDistrictComponent } from "./BasicDistrictComponent";
import { CameraObj } from "./CameraObj";

export class WorldObj {
    cameraLocation: number;

    readonly size: Vector2;
    readonly quarterNum: Vector2;

    scene: Scene;

    basicComp: BasicDistrictComponent;
    obj: MeshObjStore;
    quarter: QuarterStore;
    camera: CameraObj;

    constructor(worldSize: Vector2, cameraLocation: number, quarterNum: Vector2, lookup: Lookup) {
        this.size = worldSize;
        this.cameraLocation = cameraLocation;
        this.quarterNum = quarterNum;
        
        this.basicComp = new BasicDistrictComponent();

        this.obj = new MeshObjStore(this);
        this.quarter = new QuarterStore();
    }
}