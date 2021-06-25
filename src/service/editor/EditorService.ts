import { CameraService } from "../camera/CameraService";
import { CameraController } from "./controllers/CameraController";
import { MeshLoaderController } from "./controllers/MeshLoaderController";


export class EditorService {

    isEditorOpen = false;

    readonly cameraController: CameraController;
    readonly meshLoaderController: MeshLoaderController;

    constructor(meshLoaderController: MeshLoaderController, cameraController: CameraController) {
        this.meshLoaderController = meshLoaderController;
        this.cameraController = cameraController;
    }
}