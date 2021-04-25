import { PointerData } from "../services/input/PointerService";

export enum ToolType {
    PATH = 'PATH',
    MOVE = 'MOVE'
}

export abstract class Tool {
    readonly type: ToolType;

    constructor(type: ToolType) {
        this.type = type;
    }

    beforeRender() {}

    pointerMove(pointer: PointerData) {}
    pointerDown(pointer: PointerData) {}
    select(isCanceled: boolean): void {}

    isCanceled(): boolean { return false; }
    cancel(): void {}
    reset(): void {}
    
    keyDown(e: KeyboardEvent) {}
    keyUp(e: KeyboardEvent) {}
}