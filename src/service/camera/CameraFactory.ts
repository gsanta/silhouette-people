import { ArcRotateCamera, Vector3 } from "babylonjs";
import { CameraObject } from "../../model/objects/camera/CameraObject";
import { WorldObj } from "../../model/objects/WorldObj";
import { WorldProvider } from "../WorldProvider";


export class CameraFactory {

    private readonly worldProvider: WorldProvider;

    constructor(worldProvider: WorldProvider) {
        this.worldProvider = worldProvider;
    }

    createStaticCamera() {
        const camera = new ArcRotateCamera("camera-static", Math.PI + Math.PI / 3, Math.PI / 3, 120, new Vector3(0, 0, 0), this.worldProvider.scene);
        camera.attachControl(this.worldProvider.canvas, true);

        const cameraOj = new CameraObject(camera, this.worldProvider.world);

        return cameraOj;
    }

}