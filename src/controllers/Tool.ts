import { PointerData } from "../services/input/PointerService";

export enum ToolType {
    PATH = 'PATH'
}

export abstract class Tool {
    readonly type: ToolType;

    constructor(type: ToolType) {
        this.type = type;
    }

    pointerMove(pointer: PointerData) {}
    pointerDown(pointer: PointerData) {}
    select(): void {}
    cancel(): void {}
    keyDown(e: KeyboardEvent) {}
    keyUp(e: KeyboardEvent) {}
}