import { Engine, Scene, Vector2 } from "babylonjs";
import { Lookup } from "../../services/Lookup";
import { MeshStore } from "../../stores/MeshStore";
import { QuarterStore } from "../../stores/QuarterStore";
import { BasicDistrictComponent } from "./BasicDistrictComponent";
import { CameraObj } from "./CameraObj";

export class WorldObj {
    readonly QUARTER_SIZE: number;

    cameraLocation: number;

    readonly size: Vector2;
    readonly quarterNum: Vector2;

    scene: Scene;
    engine: Engine;

    basicComp: BasicDistrictComponent;
    camera: CameraObj;

    constructor(worldSize: Vector2, cameraLocation: number, quarterNum: Vector2) {
        this.size = worldSize;
        this.cameraLocation = cameraLocation;
        this.quarterNum = quarterNum;
        
        this.basicComp = new BasicDistrictComponent();
    }
}