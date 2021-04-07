import { ArcRotateCamera, Vector2, Vector3 } from "babylonjs";
import { DistrictObj } from "./DistrictObj";


export class CameraObj {
    private district: DistrictObj;
    private quarterIndex: number = 2;
    private cornerIndex: number = 2;

    private readonly camera: ArcRotateCamera;

    constructor(camera: ArcRotateCamera) {
        this.camera = camera;
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

    setDistrict(district: DistrictObj) {
        this.district = district;
        this.updateCameraPosition();
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

    private updateCameraPosition() {
        const quarter = this.district.quarter.getQuarter(this.quarterIndex);

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