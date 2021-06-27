import { PointerInfo } from "babylonjs";
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
} 