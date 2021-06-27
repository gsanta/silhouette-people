import { PointerInfo } from "babylonjs";
import { KeyName } from "../../input/KeyboardService";
import { ToolType } from "../controllers/TransformController";


export abstract class Tool {
    readonly toolType: ToolType;

    constructor(toolType: ToolType) {
        this.toolType = toolType;
    }

    select() {}
    deselect() {}
    move(pointerInfo: PointerInfo) {}
    up(pointerInfo: PointerInfo) {}
    keyDown(key: KeyName) {}
} 