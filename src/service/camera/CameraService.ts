import { CameraObject } from "../../model/objects/camera/CameraObject";
import { WorldProvider } from "../WorldProvider";

export class CameraService {
    private cameras: CameraObject[] = [];
    private activeCamera: CameraObject;

    private readonly worldProvider: WorldProvider;

    constructor(worldProvider: WorldProvider) {
        this.worldProvider = worldProvider;
    }

    addCamera(camera: CameraObject, setAsActive = false) {
        this.cameras.push(camera);

        if (setAsActive) {
            this.setAsActiveCamera(camera);
            this.worldProvider.scene.activeCamera = camera.getCamera();
        }
    }

    setAsActiveCamera(camera: CameraObject) {
        if (this.cameras.includes(camera)) {
            this.activeCamera = camera;
        }
    }

    getActiveCamera() {
        return this.activeCamera;
    }

    hasActiveCamera() {
        return !!this.activeCamera;
    }
}