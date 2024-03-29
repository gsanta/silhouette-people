import { Engine, Mesh, Scene, Vector2 } from "babylonjs";
import { CameraObject } from "./camera/CameraObject";

export class WorldObj {
    readonly QUARTER_SIZE: number;

    cameraLocation: number;

    scene: Scene;
    engine: Engine;

    // TODO: put into MeshStore.
    ground: Mesh;
    activeQuarterIndex = -1;

    constructor(cameraLocation: number) {
        this.cameraLocation = cameraLocation;
    }
}