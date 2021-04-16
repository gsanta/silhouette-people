import { PointerData } from "../services/input/PointerService";

export enum ControllerType {
    Player = 'Player',
    Camera = 'Camera',
    Enemy = 'Enemy',
}

export abstract class AbstractController {
    abstract type: ControllerType;
    keyboard(e: KeyboardEvent, isKeyDown: boolean) {}
    pointerDown(pointer: PointerData) {}
    pointerMove(pointer: PointerData) {}
    beforeRender() {}
}