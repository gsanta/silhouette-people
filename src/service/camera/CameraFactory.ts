import { ArcRotateCamera, FollowCamera, Vector3 } from "babylonjs";
import { CameraObject } from "../../model/objects/camera/CameraObject";
import { SceneService } from "../SceneService";


export class CameraFactory {

    private readonly worldProvider: SceneService;

    constructor(worldProvider: SceneService) {
        this.worldProvider = worldProvider;
    }

    createStaticCamera() {
        const camera = new ArcRotateCamera("camera-static", Math.PI + Math.PI / 3, Math.PI / 3, 120, new Vector3(0, 0, 0), this.worldProvider.scene);
        camera.attachControl(this.worldProvider.canvas, true);

        const cameraOj = new CameraObject('static-camera', camera, this.worldProvider.world);

        return cameraOj;
    }


    createFollowCamera() {
        const camera = new FollowCamera("camera-follow", new Vector3(0, 10, -10), this.worldProvider.scene);

        camera.radius = 30;

        camera.heightOffset = 20;
        camera.rotationOffset = 180;
        camera.cameraAcceleration = 0.005;
        camera.maxCameraSpeed = 10;

        const cameraOj = new CameraObject('follow-camera', camera, this.worldProvider.world);

        return cameraOj;
    }
}