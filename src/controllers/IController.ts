import { PointerData } from "../services/input/PointerService";

export enum ControllerType {
    Player = 'Player',
    Camera = 'Camera'
}

export abstract class AbstractController {
    abstract type: ControllerType;
    keyboard(e: KeyboardEvent) {}
    pointerDown(pointer: PointerData) {}
    pointerMove(pointer: PointerData) {}
}