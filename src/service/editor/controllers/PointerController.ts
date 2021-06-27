import { PointerInfo } from "babylonjs/Events/pointerEvents";
import { BaseService } from "../../BaseService";
import { SceneService } from "../../SceneService";
import { ToolController } from "./ToolController";

export class PointerController extends BaseService {

    private readonly toolController: ToolController;

    constructor(sceneService: SceneService, toolController: ToolController) {
        super(sceneService);
        this.toolController = toolController;
        this.pointerObservable = this.pointerObservable.bind(this);
    }

    awake() {
        this.sceneService.scene.onPointerObservable.add(this.pointerObservable);
    }

    private pointerObservable(pointerInfo: PointerInfo) {
        switch (pointerInfo.type) {
            case BABYLON.PointerEventTypes.POINTERMOVE:
                if (this.toolController.activeTool) {
                    this.toolController.activeTool.move(pointerInfo);
                }
            break;
            case BABYLON.PointerEventTypes.POINTERUP:
                if (this.toolController.activeTool) {
                    this.toolController.activeTool.up(pointerInfo);
                }
            break;
        }
    }
}