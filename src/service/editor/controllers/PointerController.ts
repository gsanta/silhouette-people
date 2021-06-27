import { Matrix, PointerInfo, Vector3 } from "babylonjs";
import { BaseService } from "../../BaseService";
import { KeyboardService, KeyName } from "../../input/KeyboardService";
import { SceneService } from "../../SceneService";
import { ToolController } from "./ToolController";

export class PointerController extends BaseService {

    private readonly toolController: ToolController;
    private readonly keyboardService: KeyboardService;

    constructor(sceneService: SceneService, toolController: ToolController, keyboardService: KeyboardService) {
        super(sceneService);
        this.toolController = toolController;
        this.keyboardService = keyboardService;
        this.pointerObservable = this.pointerObservable.bind(this);
        this.onKeyDown = this.onKeyDown.bind(this);

        this.keyboardService.onKeydown(this.onKeyDown);
    }

    awake() {
        this.sceneService.scene.onPointerObservable.add(this.pointerObservable);
    }

    private pointerObservable(pointerInfo: PointerInfo) {
        switch (pointerInfo.type) {
            case BABYLON.PointerEventTypes.POINTERMOVE:
                if (this.toolController.activeTool) {
                    this.toolController.activeTool.move(this.getCursorPos());
                }
            break;
            case BABYLON.PointerEventTypes.POINTERUP:
                if (this.toolController.activeTool) {
                    this.toolController.activeTool.up(this.getCursorPos());
                }
            break;
        }
    }

    private onKeyDown(keyName: KeyName) {
        if (this.toolController.activeTool) {
            this.toolController.activeTool.keyDown(keyName);
        }
    }

    private getCursorPos(): Vector3 {
        const scene = this.sceneService.scene;
        
        let ray = scene.createPickingRay(scene.pointerX, scene.pointerY, Matrix.Identity(), null);
        let hit = scene.pickWithRay(ray, (mesh) => {
            return mesh.name.startsWith('ground');
        });

        if (hit) {
            return hit.pickedPoint;
        }
    }
}