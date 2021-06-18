import { ArcRotateCamera, Vector2, Vector3 } from "babylonjs";
import { InjectProperty } from "../../../di/diDecorators";
import { lookup } from "../../../service/Lookup";
import { QuarterStore } from "../../../store/QuarterStore";
import { WorldObj } from "../WorldObj";


export class CameraObject {

    @InjectProperty("QuarterStore")
    private quarterStore: QuarterStore;

    private worldObj: WorldObj;
    private quarterIndex: number = 2;
    private cornerIndex: number = 2;

    private readonly camera: ArcRotateCamera;

    constructor(camera: ArcRotateCamera, worldObj: WorldObj) {
        this.camera = camera;
        this.worldObj = worldObj;
        this.quarterStore = lookup.quarterStore;
    }

    getCamera() {
        return this.camera;
    }

    setPosition(vector: Vector3) {
        this.camera.setPosition(vector);
    }

    setTarget(vector: Vector3) {
        this.camera.setTarget(vector);
    }

    setQuarterIndex(index: number) {
        this.quarterIndex = index;
        this.updateCameraPosition();
    }

    getQuarterIndex(): number {
        return this.quarterIndex;
    }

    increaseCornerIndex() {
        this.cornerIndex = (this.cornerIndex + 1) % 4;
        this.updateCameraPosition();
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

    private updateCameraPosition() {
        const quarter = this.quarterStore.getQuarter(this.quarterIndex);

        const size = quarter.getSize();
        const height = 25;
        const halfX = size.x / 2;
        const halfY = size.y / 2;
        const offset = 15;
        
        const center2D = quarter.getPosition2D();
        const center = quarter.getPosition();
        let pos2D: Vector2;
        let pos3D: Vector3;

        switch(this.cornerIndex) {
            case 0:
                pos2D = center2D.add(new Vector2(halfX + offset, halfY + offset));
            break;
            case 1:
                pos2D = center2D.add(new Vector2(halfX + offset, - (halfY + offset)));
            break;
            case 2:
                pos2D = center2D.add(new Vector2(- (halfX + offset), - (halfY + offset)));
            break;
            case 3:
                pos2D = center2D.add(new Vector2(- (halfX + offset), halfY + offset));
            break;
        }

        pos3D = new Vector3(pos2D.x, height, pos2D.y);

        this.camera.setPosition(pos3D);
        this.camera.setTarget(center);
    }
}