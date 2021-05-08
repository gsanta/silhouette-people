import { Engine, Mesh, Scene, Vector2 } from "babylonjs";
import { CameraObj } from "./CameraObj";

export class WorldObj {
    readonly QUARTER_SIZE: number;

    cameraLocation: number;

    scene: Scene;
    engine: Engine;

    // TODO: put into MeshStore.
    ground: Mesh;
    camera: CameraObj;

    constructor(cameraLocation: number) {
        this.cameraLocation = cameraLocation;
    }
}