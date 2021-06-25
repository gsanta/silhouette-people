import { CameraService } from "../../camera/CameraService";
import { RenderGuiService } from "../../RenderGuiService";

export class CameraController {

    private readonly cameraService: CameraService;
    private readonly renderGuiService: RenderGuiService;

    constructor(cameraService: CameraService, renderGuiService: RenderGuiService) {
        this.cameraService = cameraService;
        this.renderGuiService = renderGuiService;
    }

    set activeCamera(name: string) {
        this.cameraService.activateCamera(name);
        this.renderGuiService.render();
    }

    get activeCamera(): string {
        return this.cameraService.getActiveCamera().name;
    }

    get cameras(): string[] {
        return this.cameraService.cameras.map(camera => camera.name);
    }
}