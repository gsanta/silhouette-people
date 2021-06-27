import { PointerInfo } from "babylonjs";
import { BaseService } from "../../BaseService";
import { KeyName } from "../../input/KeyboardService";
import { SceneService } from "../../SceneService";
import { ToolType } from "../controllers/TransformController";


export abstract class Tool extends BaseService {
    readonly toolType: ToolType;

    constructor(sceneService: SceneService, toolType: ToolType) {
        super(sceneService);
        this.toolType = toolType;
    }

    select() {}
    deselect() {}
    move(pointerInfo: PointerInfo) {}
    up(pointerInfo: PointerInfo) {}
    keyDown(key: KeyName) {}
} 