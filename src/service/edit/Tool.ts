import { PointerData } from "../base/pointer/PointerService";

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

    isReset(): boolean { return false; }
    cancel(): void {}
    reset(): void {}
    
    keyDown(e: KeyboardEvent) {}
    keyUp(e: KeyboardEvent) {}
}