
export enum ControllerType {
    Player = 'Player',
    Camera = 'Camera'
}

export abstract class AbstractController {
    abstract type: ControllerType;
    keyboard(e: KeyboardEvent) {}
    pointerDown() {}
}