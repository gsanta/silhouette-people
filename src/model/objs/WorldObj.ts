import { Engine, Mesh, Scene, Vector2 } from "babylonjs";
import { CameraObj } from "./CameraObj";

export class WorldObj {
    readonly QUARTER_SIZE: number;

    cameraLocation: number;

    readonly size: Vector2;
    readonly quarterNum: Vector2;

    scene: Scene;
    engine: Engine;

    // TODO: put into MeshStore.
    ground: Mesh;
    camera: CameraObj;

    constructor(worldSize: Vector2, cameraLocation: number, quarterNum: Vector2) {
        this.size = worldSize;
        this.cameraLocation = cameraLocation;
        this.quarterNum = quarterNum;
    }
}