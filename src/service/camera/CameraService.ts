import { CameraObject } from "../../model/objects/camera/CameraObject";
import { SceneService } from "../SceneService";

export class CameraService {
    private _cameras: CameraObject[] = [];
    private activeCamera: CameraObject;

    private readonly worldProvider: SceneService;

    constructor(worldProvider: SceneService) {
        this.worldProvider = worldProvider;
    }

    get cameras(): CameraObject[] {
        return this._cameras;
    }

    addCamera(camera: CameraObject, setAsActive = false) {
        this._cameras.push(camera);

        if (setAsActive) {
            this.activateCamera(camera.name);
        }
    }

    activateCamera(name: string) {
        const camera = this._cameras.find(camera => camera.name === name);

        if (camera && this.activeCamera !== camera) {
            this.activeCamera = camera;
            this.worldProvider.scene.activeCamera = camera.getCamera();
        }
    }

    getActiveCamera() {
        return this.activeCamera;
    }

    hasActiveCamera() {
        return !!this.activeCamera;
    }
}