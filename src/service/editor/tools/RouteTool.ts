import { Matrix, PointerInfo } from "babylonjs";
import { SceneService } from "../../SceneService";
import { ToolType } from "../controllers/TransformController";
import { Tool } from "./Tool";


export class RouteTool extends Tool {

    private readonly sceneService: SceneService;

    constructor(sceneService: SceneService) {
        super(ToolType.ROUTE);
        this.sceneService = sceneService;
    }

    move() {
        const scene = this.sceneService.scene;
        let ray = scene.createPickingRay(scene.pointerX, scene.pointerY, Matrix.Identity(), null);
        let hit = scene.pickWithRay(ray, (mesh) => {
            return mesh.name.startsWith('ground');
        });
        let pickedPoint = hit.pickedPoint;
    }

    up() {
    }
}