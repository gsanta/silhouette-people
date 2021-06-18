import { TargetCamera, Vector2, Vector3 } from "babylonjs";
import { MonoBehaviour } from "../../behaviours/MonoBehaviour";
import { InputController } from "../game_object/InputController";
import { WorldObj } from "../WorldObj";

export class CameraObject {
    inputController: InputController;
    private worldObj: WorldObj;

    private _behaviours: Map<string, MonoBehaviour> = new Map();

    private readonly camera: TargetCamera;

    constructor(camera: TargetCamera, worldObj: WorldObj) {
        this.camera = camera;
        this.worldObj = worldObj;
    }

    update(deltaTime: number) {
        this._behaviours.forEach((val) => val.update(deltaTime));
    }

    addBehaviour(behaviour: MonoBehaviour) {
        this._behaviours.set(behaviour.name, behaviour);
    }

    getCamera() {
        return this.camera;
    }

    setTarget(vector: Vector3) {
        this.camera.setTarget(vector);
    }

    screenToCanvasPoint(screenPoint: Vector2, pos: Vector3 = new Vector3(0, 0, 0)): Vector3 {
        const scene = this.worldObj.scene;

        const pickResult = scene.pick(screenPoint.x, screenPoint.y);
        const rayOrigin = pickResult.ray.origin 
        const rayDirection = pickResult.ray.direction;
        
        const planeNormal = new Vector3(0, 1, 0);
        const planePoint = pos;

        const planePointMinusRayOrig = planePoint.subtract(rayOrigin);
        const t = Vector3.Dot(planePointMinusRayOrig, planeNormal) / Vector3.Dot(rayDirection, planeNormal);
        const p = rayOrigin.add(rayDirection.multiply(new Vector3(t, t, t)));
        return p;
    }
}