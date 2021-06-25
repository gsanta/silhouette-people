import { CameraService } from "../camera/CameraService";
import { CameraController } from "./controllers/CameraController";
import { FogOfWarController } from "./controllers/FogOfWarController";
import { MeshLoaderController } from "./controllers/MeshLoaderController";
import { SceneExportController } from "./controllers/SceneExportController";
import { ToolController } from "./controllers/ToolController";


export class EditorService {

    isEditorOpen = false;

    readonly cameraController: CameraController;
    readonly meshLoaderController: MeshLoaderController;
    readonly fogOfWarController: FogOfWarController;
    readonly sceneExportController: SceneExportController;
    readonly toolController: ToolController;

    constructor(
        meshLoaderController: MeshLoaderController,
        cameraController: CameraController,
        fogOfWarController: FogOfWarController,
        sceneExportController: SceneExportController,
        toolController: ToolController 
    ) {
        this.meshLoaderController = meshLoaderController;
        this.cameraController = cameraController;
        this.fogOfWarController = fogOfWarController;
        this.sceneExportController = sceneExportController;
        this.toolController = toolController;
    }
}