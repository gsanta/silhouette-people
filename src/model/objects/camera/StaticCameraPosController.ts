import { ArcRotateCamera, Vector2, Vector3 } from "babylonjs";
import { QuarterStore } from "../../../store/QuarterStore";
import { MonoBehaviour } from "../../behaviours/MonoBehaviour";
import { MonoBehaviourName } from "../../behaviours/MonoBehaviourName";
import { WorldObj } from "../WorldObj";
import { CameraObject } from "./CameraObject";

export class StaticCameraPosController extends MonoBehaviour {

    private readonly world: WorldObj;
    private readonly camera: CameraObject;
    private readonly quarterStore: QuarterStore;
    private currentQuarterIndex = -1;
    private cornerIndex = 2;

    constructor(worldObj: WorldObj, camera: CameraObject, quarterStore: QuarterStore) {
        super(MonoBehaviourName.STATIC_CAMERA_POS_CONTROLLER);
        this.world = worldObj;
        this.camera = camera;
        this.quarterStore = quarterStore;
    }

    update() {
        // if (this.world.activeQuarterIndex !== -1 && this.world.activeQuarterIndex !== this.currentQuarterIndex) {
        //     this.currentQuarterIndex = this.world.activeQuarterIndex;
        //     this.updateCameraPosition();
        // }
    }

    increaseCornerIndex() {
        this.cornerIndex = (this.cornerIndex + 1) % 4;
        this.updateCameraPosition();
    }

    private updateCameraPosition() {
        if (this.currentQuarterIndex === -1) {
            return;
        }

        const quarter = this.quarterStore.getQuarter(this.currentQuarterIndex);

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

        (<ArcRotateCamera> this.camera.getCamera()).setPosition(pos3D);
        this.camera.setTarget(center);
    }
}